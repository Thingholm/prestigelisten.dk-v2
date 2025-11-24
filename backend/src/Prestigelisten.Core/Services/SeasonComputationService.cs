using Prestigelisten.Core.Helpers;
using Prestigelisten.Core.Interfaces.Services;

namespace Prestigelisten.Core.Services;

public class SeasonComputationService : ISeasonComputationService
{
    public void ProcessSeasons<TEntity, TSeason>(
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

    public void RecalculateSeasonPoints<TEntity, TSeason>(
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
