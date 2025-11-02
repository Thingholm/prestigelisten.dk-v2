using Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;

public interface INationsService
{
    /// <summary>
    /// Retrieves all rows from nations lists
    /// </summary>
    /// <returns></returns>
    List<GoogleSheetsNation> GetAllNations();
}
