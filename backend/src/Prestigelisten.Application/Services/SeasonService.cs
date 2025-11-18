using Prestigelisten.Application.Helpers;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Application.Services;

public class SeasonService : ISeasonService
{
    private readonly IBaseRepository<RiderSeason> _riderSeasonRepository;
    private readonly IBaseRepository<NationSeason> _nationSeasonRepository;

    public SeasonService(
        IBaseRepository<RiderSeason> riderSeasonRepository, 
        IBaseRepository<NationSeason> nationSeasonRepository 
    )
    {
        _riderSeasonRepository = riderSeasonRepository;
        _nationSeasonRepository = nationSeasonRepository;
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

        RecalculateSeasonPoints(
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

        RecalculateSeasonPoints(
            riderSeasons,
            previousSeasons,
            season => season.Rider
        );

        RankCalculationHelper.CalculateRanks(riderSeasons, rs => rs.PointsAllTime, (rs, rank) => rs.RankAllTime = rank);
        RankCalculationHelper.CalculateRanks(riderSeasons, rs => rs.PointsForYear, (rs, rank) => rs.RankForYear = rank);
    }

    private static void RecalculateSeasonPoints<TEntity, TSeason>(
        List<TSeason> seasons,
        Dictionary<int, TSeason> previousSeasons,
        Func<TSeason, TEntity> getSeasonEntity
    )
        where TEntity : IEntity
        where TSeason : ISeason
    {
        foreach (var season in seasons)
        {
            season.PointsAllTime = 0;

            previousSeasons.TryGetValue(getSeasonEntity(season).Id, out var previousSeason);
            if (previousSeason is not null)
            {
                season.PointsAllTime += previousSeason.PointsAllTime;
            }

            season.PointsAllTime += season.PointsForYear ?? 0;
        }
    }

    private async Task CalculateAllNationSeasonsPointsAndRanks()
    {
        var nationSeasons = _nationSeasonRepository.GetAll().ToList();
        var nations = nationSeasons.Select(ns => ns.Nation).DistinctBy(n => n.Id).ToList();

        ProcessSeasons(
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

        ProcessSeasons(
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

    private static void ProcessSeasons<TEntity, TSeason>(
        List<TEntity> entities,
        List<TSeason> seasons,
        Func<TSeason, TEntity> getSeasonEntity,
        Func<TEntity, int, TSeason> createSeason
    )
        where TEntity : IEntity
        where TSeason : class, ISeason
    {
        foreach (var entity in entities)
        {
            AccumulatePointsAllTimeAndFillMissingSeasons(
                entity,
                seasons,
                getSeasonEntity,
                createSeason
            );
        }

        CalculateRanksForAllSeasons(seasons);
    }

    private static void AccumulatePointsAllTimeAndFillMissingSeasons<TEntity, TSeason>(
        TEntity entity,
        List<TSeason> seasons,
        Func<TSeason, TEntity> getSeasonEntity,
        Func<TEntity, int, TSeason> createSeason
    ) 
        where TSeason : ISeason 
        where TEntity : IEntity
    {
        var entitySeasons = seasons.Where(s => getSeasonEntity(s).Id == entity.Id).ToList();

        var firstYear = entitySeasons.Min(s => s.Year);
        var cumulativePoints = 0;

        for (int year = firstYear; year <= DateTime.UtcNow.Year; year++)
        {
            var season = entitySeasons.FirstOrDefault(ns => ns.Year == year);

            if (season is null)
            {
                season = createSeason(entity, year);
                seasons.Add(season);
            }

            cumulativePoints += season.PointsForYear ?? 0;
            season.PointsAllTime = cumulativePoints;
        }
    }

    private static void CalculateRanksForAllSeasons<TSeason>(List<TSeason> seasons) 
        where TSeason : class, ISeason
    {
        var lowestYear = seasons.Min(s => s.Year);
        for (int year = lowestYear; year <= DateTime.UtcNow.Year; year++)
        {
            var seasonsForYear = seasons.Where(ns => ns.Year == year).ToList();
            RankCalculationHelper.CalculateRanks(seasonsForYear, s => s.PointsAllTime, (s, rank) => s.RankAllTime = rank);
            RankCalculationHelper.CalculateRanks(seasonsForYear, s => s.PointsForYear, (s, rank) => s.RankForYear = rank);
        }
    }
}
