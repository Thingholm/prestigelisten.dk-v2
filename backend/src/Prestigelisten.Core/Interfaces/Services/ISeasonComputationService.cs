namespace Prestigelisten.Core.Interfaces.Services;

public interface ISeasonComputationService
{
    void ProcessSeasons<TEntity, TSeason>(
        List<TEntity> entities,
        List<TSeason> seasons,
        Func<TSeason, TEntity> getSeasonEntity,
        Func<TEntity, int, TSeason> createSeason
    )
        where TEntity : IEntity
        where TSeason : class, ISeason;

    void RecalculateSeasonPoints<TEntity, TSeason>(
    List<TSeason> seasons,
        Dictionary<int, TSeason> previousSeasons,
        Func<TSeason, TEntity> getSeasonEntity
    )
        where TEntity : IEntity
        where TSeason : ISeason;
}
