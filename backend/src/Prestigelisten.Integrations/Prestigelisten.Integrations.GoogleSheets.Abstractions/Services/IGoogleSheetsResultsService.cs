using Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;

public interface IGoogleSheetsResultsService
{
    /// <summary>
    /// Retrieves all rows from results list
    /// </summary>
    /// <returns></returns>
    Task<List<GoogleSheetsResult>> GetAllResultsAsync();
}
