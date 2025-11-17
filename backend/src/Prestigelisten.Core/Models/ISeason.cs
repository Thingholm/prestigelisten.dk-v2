namespace Prestigelisten.Core.Models;

public interface ISeason
{
    public int Year { get; set; }

    public int? PointsForYear { get; set; }

    public int PointsAllTime { get; set; }

    public int? RankForYear { get; set; }

    public int RankAllTime { get; set; }
}
