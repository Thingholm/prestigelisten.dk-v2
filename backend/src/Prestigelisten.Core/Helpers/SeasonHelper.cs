namespace Prestigelisten.Core.Helpers;

public static class SeasonHelper
{
    public static TSeason GetOrCreate<TSeason>(ICollection<TSeason> seasons, Func<TSeason, bool> finder, Func<TSeason> createNew) 
        where TSeason : ISeason
    {
        var season = seasons.FirstOrDefault(finder);

        if (season is null)
        {
            season = createNew();
            seasons.Add(season);
        }

        return season;
    }

    public static TSeason GetOrCreate<TSeason>(ICollection<TSeason> seasons, int year, Func<TSeason> createNew)
    where TSeason : ISeason
    {
        return GetOrCreate(seasons, s => s.Year == year, createNew);
    }
}
