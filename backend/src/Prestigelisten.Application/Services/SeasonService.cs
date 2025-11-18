using Prestigelisten.Application.Helpers;

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
        await CalculateNationSeasonsPointsAndRanks();
        await CalculateRiderSeasonsPointsAndRanks();
    }

    private async Task CalculateNationSeasonsPointsAndRanks()
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

    private async Task CalculateRiderSeasonsPointsAndRanks()
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
        var lowestYear = seasons.Min(rs => rs.Year);
        for (int year = lowestYear; year <= DateTime.UtcNow.Year; year++)
        {
            var seasonsForYear = seasons.Where(ns => ns.Year == year).ToList();
            RankCalculationHelper.CalculateRanks(seasonsForYear, ns => ns.PointsAllTime, (ns, rank) => ns.RankAllTime = rank);
            RankCalculationHelper.CalculateRanks(seasonsForYear, ns => ns.PointsForYear, (ns, rank) => ns.RankForYear = rank);
        }
    }
}
