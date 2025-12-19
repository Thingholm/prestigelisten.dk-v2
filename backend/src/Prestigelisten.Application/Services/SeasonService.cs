using Prestigelisten.Application.Interfaces.Services;
using Prestigelisten.Core.Helpers;
using Prestigelisten.Core.Interfaces.Services;

namespace Prestigelisten.Application.Services;

public class SeasonService : ISeasonService
{
    private readonly IRiderSeasonRepository _riderSeasonRepository;
    private readonly INationSeasonRepository _nationSeasonRepository;
    private readonly ISeasonComputationService _seasonComputationService;

    public SeasonService(
        IRiderSeasonRepository riderSeasonRepository, 
        INationSeasonRepository nationSeasonRepository,
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

        _nationSeasonRepository.AddOrUpdateRange(nationSeasons);
        await _nationSeasonRepository.SaveChangesAsync();
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

        _riderSeasonRepository.AddOrUpdateRange(riderSeasons);
        await _riderSeasonRepository.SaveChangesAsync();
    }

    private async Task CalculateAllNationSeasonsPointsAndRanks()
    {
        var nationSeasons = (await _nationSeasonRepository.GetAllAsync()).ToList();
        var nationIds = new HashSet<int>();
        var nations = new List<Nation>();

        foreach (var season in nationSeasons)
        {
            if (nationIds.Add(season.Nation.Id))
            {
                nations.Add(season.Nation);
            }
        }
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

        foreach (var batch in nationSeasons.Chunk(1000))
        {
            _nationSeasonRepository.AddOrUpdateRange(batch);
            await _nationSeasonRepository.SaveChangesAsync();
        }
    }

    private async Task CalculateAllRiderSeasonsPointsAndRanks()
    {
        var riderSeasons = (await _riderSeasonRepository.GetAllAsync()).ToList();

        var riderIds = new HashSet<int>();
        var riders = new List<Rider>();

        foreach (var season in riderSeasons)
        {
            if (riderIds.Add(season.Rider.Id))
            {
                riders.Add(season.Rider);
            }
        }
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

        foreach (var batch in riderSeasons.Chunk(1000))
        {
            _riderSeasonRepository.AddOrUpdateRange(batch);
            await _riderSeasonRepository.SaveChangesAsync();
        }
    }
}
