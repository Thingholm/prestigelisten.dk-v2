using Google.Apis.Sheets.v4.Data;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions;

public interface IConnector
{
    /// <summary>
    /// Retrieves all rows from riders all time list sheet in Google Sheets
    /// <returns></returns>
    List<List<string>> GetRidersAllTimeSheetValues();

    /// <summary>
    /// Retrieves all rows from riders active list sheet in Google Sheets
    /// </summary>
    /// <returns></returns>
    List<List<string>> GetRidersActiveSheetValues();

    /// <summary>
    /// Retrieves all rows from nations list sheet in Google Sheets
    /// </summary>
    /// <returns></returns>
    List<List<string>> GetNationsSheetValues();

    /// <summary>
    /// Retrieves all rows or first two rows depending on <paramref name="isAllYears"/> from results sheet in Google Sheets
    /// </summary>
    /// <param name="isAllYears"></param>
    /// <returns></returns>
    List<List<string>> GetResultsSheetValues(bool isAllYears = true);
}
