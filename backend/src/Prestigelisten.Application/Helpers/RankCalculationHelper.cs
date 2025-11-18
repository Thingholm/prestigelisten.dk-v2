namespace Prestigelisten.Application.Helpers;

public class RankCalculationHelper
{
    public static List<T> CalculateRanks<T>(List<T> PointsTable, Func<T, int?> pointsSelector, Action<T, int> setRankAction) where T : class
    {
        if (PointsTable.Count == 0)
        {
            return PointsTable;
        }

        PointsTable = PointsTable
            .Where(pt => pointsSelector(pt).HasValue)
            .OrderByDescending(pointsSelector)
            .ToList();

        int rank = 1;
        int previousPoints = pointsSelector(PointsTable[0])!.Value;

        setRankAction(PointsTable[0], rank);

        for (int i = 1; i < PointsTable.Count; i++)
        {
            var points = pointsSelector(PointsTable[i])!.Value;

            if (points == previousPoints)
            {
                setRankAction(PointsTable[i], rank);
                continue;
            }

            rank = i + 1;
            setRankAction(PointsTable[i], rank);
            previousPoints = points;
        }

        return PointsTable;
    }
}
