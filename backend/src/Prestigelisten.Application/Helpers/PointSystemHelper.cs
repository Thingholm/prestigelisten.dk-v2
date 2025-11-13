namespace Prestigelisten.Application.Helpers;

public static class PointSystemHelper
{
    public static PointSystem? GetPointSystemForResult(
        IEnumerable<PointSystem> pointSystem,
        Result result
    )
    {
        return pointSystem.FirstOrDefault(ps =>
            ps.ResultType == result.ResultType && ps.RaceClass.Id == result.Race.RaceClass.Id
        );
    }
}
