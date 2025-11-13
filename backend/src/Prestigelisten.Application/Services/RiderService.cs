using Microsoft.Extensions.Logging;
using Prestigelisten.Application.DTOs;
using Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;

namespace Prestigelisten.Application.Services;

public class RiderService : IRiderService
{
    private readonly IRiderRepository _riders;
    private readonly IBaseRepository<Nation> _nations;
    private readonly IBaseRepository<Team> _teams;
    private readonly IGoogleSheetsRidersService _googleSheetsRidersService;
    private readonly ILogger<RiderService> _logger;

    public RiderService(
        IRiderRepository riders,
        IBaseRepository<Nation> nations,
        IBaseRepository<Team> teams,
        IGoogleSheetsRidersService googleSheetsRidersService,
        ILogger<RiderService> logger
    )
    {
        _riders = riders;
        _nations = nations;
        _teams = teams;
        _googleSheetsRidersService = googleSheetsRidersService;
        _logger = logger;
    }

    public async Task<SyncRidersResultDTO> SyncRidersFromGoogleSheetsAsync()
    {
        var resultDTO = new SyncRidersResultDTO();

        var googleSheetsRiders = _googleSheetsRidersService.GetAllRiders();
        var nations = _nations
            .GetAll()
            .ToDictionary(
                nation => nation.Name,
                nation => nation,
                StringComparer.OrdinalIgnoreCase
            );
        var teams = _teams
            .GetAll()
            .ToDictionary(team => team.Name, team => team, StringComparer.OrdinalIgnoreCase);
        var riders = _riders
            .GetAll()
            .ToDictionary(
                rider => rider.FullName,
                rider => rider,
                StringComparer.OrdinalIgnoreCase
            );

        foreach (var sheetRider in googleSheetsRiders)
        {
            var (nation, isNewNation) = await GetOrCreateNationAsync(sheetRider.Nation, nations);
            var (team, isNewTeam) = await GetOrCreateTeamAsync(sheetRider.Team, teams);
            var (rider, isNewRider, isUpdatedRider) = CreateOrUpdateRider(
                sheetRider.Name,
                nation,
                team,
                sheetRider.Year,
                sheetRider.IsActive,
                riders
            );

            if (isNewNation)
                resultDTO.AddedNations.Add(nation);
            if (isNewTeam && team is not null)
                resultDTO.AddedTeams.Add(team);
            if (isNewRider)
                resultDTO.AddedRiders.Add(rider);
            if (isUpdatedRider)
                resultDTO.UpdatedRiders.Add(rider);

            if (isNewRider || isUpdatedRider)
            {
                _riders.AddOrUpdate(rider);
            }
        }

        await _riders.SaveChangesAsync();
        return resultDTO;
    }

    private async Task<(Nation, bool)> GetOrCreateNationAsync(
        string nationName,
        Dictionary<string, Nation> nations
    )
    {
        if (nations.TryGetValue(nationName, out var nation))
        {
            return (nation, false);
        }

        _logger.LogInformation("Adding new nation: {nation}", nationName);

        nation = new Nation
        {
            Name = nationName,
            Code = nationName.Length >= 2 ? nationName[..2] : "xx",
            Active = true,
        };
        _nations.Add(nation);
        await _nations.SaveChangesAsync();
        nations[nationName] = nation;

        return (nation, true);
    }

    private async Task<(Team?, bool)> GetOrCreateTeamAsync(
        string? teamName,
        Dictionary<string, Team> teams
    )
    {
        if (string.IsNullOrWhiteSpace(teamName) || teamName == "-")
        {
            return (null, false);
        }

        if (teams.TryGetValue(teamName, out var team))
        {
            return (team, false);
        }

        _logger.LogInformation("Adding new team: {team}", teamName);

        team = new Team { Name = teamName };
        _teams.Add(team);
        await _teams.SaveChangesAsync();
        teams[teamName] = team;

        return (team, true);
    }

    private (Rider, bool, bool) CreateOrUpdateRider(
        string fullName,
        Nation nation,
        Team? team,
        int? year,
        bool isActive,
        Dictionary<string, Rider> riders
    )
    {
        var isNew = false;
        var isUpdated = false;

        var rider = riders[fullName];
        if (rider is null)
        {
            var nameParts = fullName.Split(" ", StringSplitOptions.RemoveEmptyEntries);
            var firstName = nameParts.Length > 1 ? nameParts.FirstOrDefault() : null;
            var lastName =
                nameParts.Length > 1
                    ? string.Join(" ", nameParts.Skip(1))
                    : nameParts.FirstOrDefault();

            rider = new Rider
            {
                FirstName = string.IsNullOrWhiteSpace(firstName) ? null : firstName,
                LastName = lastName,
                Nation = nation,
                Year = year,
                Active = isActive,
                Team = team,
            };

            riders[rider.FullName] = rider;

            _logger.LogInformation("Adding new rider: {rider}", rider.FullName);

            isNew = true;
        }
        else if (rider.Nation != nation || rider.Team != team || rider.Active != isActive)
        {
            rider.Nation = nation;
            rider.Team = team;
            rider.Active = isActive;
            isUpdated = true;
        }

        return (rider, isNew, isUpdated);
    }
}
