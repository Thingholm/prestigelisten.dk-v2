namespace Prestigelisten.Application.Interfaces.Services;

public interface ISeasonService
{
    Task CalculateAllSeasonsPointsAndRanks();

    Task CalculateSeasonsPointsAndRanksForYear(int year);
}
