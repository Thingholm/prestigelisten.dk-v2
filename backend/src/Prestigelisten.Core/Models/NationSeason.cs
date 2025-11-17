namespace Prestigelisten.Core.Models;

public class NationSeason : IEntity, ISeason
{
    public int Id { get; set; }

    public required Nation Nation { get; set; }

    public int Year { get; set; }

    public int? PointsForYear { get; set; }

    public int PointsAllTime { get; set; }

    public int? RankForYear { get; set; }

    public int RankAllTime { get; set; }
}
