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
}
