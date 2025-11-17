namespace Prestigelisten.Application.Helpers;

public static class SeasonHelper
{
    public static TSeason GetOrCreate<TSeason>(ICollection<TSeason> seasons, int year, Func<TSeason> createNew) 
        where TSeason : ISeason
    {
        var season = seasons.FirstOrDefault(s => s.Year == year);

        if (season is null)
        {
            season = createNew();
            seasons.Add(season);
        }

        return season;
    }
}
