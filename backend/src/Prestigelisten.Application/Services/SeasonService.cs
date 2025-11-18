using Prestigelisten.Application.Interfaces.Services;
using Prestigelisten.Core.Helpers;
using Prestigelisten.Core.Interfaces.Models;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Interfaces.Services;

namespace Prestigelisten.Application.Services;

public class SeasonService : ISeasonService
{
    private readonly IBaseRepository<RiderSeason> _riderSeasonRepository;
    private readonly IBaseRepository<NationSeason> _nationSeasonRepository;
    private readonly ISeasonComputationService _seasonComputationService;

    public SeasonService(
        IBaseRepository<RiderSeason> riderSeasonRepository, 
        IBaseRepository<NationSeason> nationSeasonRepository,
        ISeasonComputationService seasonComputationService
    )
    {
        _riderSeasonRepository = riderSeasonRepository;
        _nationSeasonRepository = nationSeasonRepository;
        _seasonComputationService = seasonComputationService;
    }

    public async Task CalculateAllSeasonsPointsAndRanks()
    {
        await CalculateAllNationSeasonsPointsAndRanks();
        await CalculateAllRiderSeasonsPointsAndRanks();
    }

    public async Task CalculateSeasonsPointsAndRanksForYear(int year)
    {
        await CalculateNationSeasonsPointsAndRanksForYear(year);
        await CalculateRiderSeasonsPointsAndRanksForYear(year);
    }

    public async Task CalculateNationSeasonsPointsAndRanksForYear(int year)
    {
        var nationSeasons = _nationSeasonRepository.Find(ns => ns.Year == year).ToList();
        var previousSeasons = _nationSeasonRepository
            .Find(s => s.Year == year - 1)
            .ToList()
            .ToDictionary(s => s.Nation.Id, s => s);

        _seasonComputationService.RecalculateSeasonPoints(
            nationSeasons,
            previousSeasons,
            season => season.Nation
        );

        RankCalculationHelper.CalculateRanks(nationSeasons, ns => ns.PointsAllTime, (ns, rank) => ns.RankAllTime = rank);
        RankCalculationHelper.CalculateRanks(nationSeasons, ns => ns.PointsForYear, (ns, rank) => ns.RankForYear = rank);
    }

    public async Task CalculateRiderSeasonsPointsAndRanksForYear(int year)
    {
        var riderSeasons = _riderSeasonRepository.Find(rs => rs.Year == year).ToList();
        var previousSeasons = _riderSeasonRepository
            .Find(s => s.Year == year - 1)
            .ToList()
            .ToDictionary(s => s.Rider.Id, s => s);

        _seasonComputationService.RecalculateSeasonPoints(
            riderSeasons,
            previousSeasons,
            season => season.Rider
        );

        RankCalculationHelper.CalculateRanks(riderSeasons, rs => rs.PointsAllTime, (rs, rank) => rs.RankAllTime = rank);
        RankCalculationHelper.CalculateRanks(riderSeasons, rs => rs.PointsForYear, (rs, rank) => rs.RankForYear = rank);
    }

    private async Task CalculateAllNationSeasonsPointsAndRanks()
    {
        var nationSeasons = _nationSeasonRepository.GetAll().ToList();
        var nations = nationSeasons.Select(ns => ns.Nation).DistinctBy(n => n.Id).ToList();

        _seasonComputationService.ProcessSeasons(
            nations,
            nationSeasons,
            season => season.Nation,
            (nation, year) => new NationSeason
            {
                Nation = nation,
                Year = year
            }
        );

        _nationSeasonRepository.AddOrUpdateRange(nationSeasons);
        await _nationSeasonRepository.SaveChangesAsync();
    }

    private async Task CalculateAllRiderSeasonsPointsAndRanks()
    {
        var riderSeasons = _riderSeasonRepository.GetAll().ToList();
        var riders = riderSeasons.Select(rs => rs.Rider).DistinctBy(r => r.Id).ToList();

        _seasonComputationService.ProcessSeasons(
            riders,
            riderSeasons,
            season => season.Rider,
            (rider, year) => new RiderSeason
            {
                Rider = rider,
                Year = year
            }
        );

        _riderSeasonRepository.AddOrUpdateRange(riderSeasons);
        await _riderSeasonRepository.SaveChangesAsync();
    }
}
