using Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;

public interface IRidersService
{
    /// <summary>
    /// Retrieves all rows from riders all time list and riders active list and merges them to one list
    /// </summary>
    /// <returns></returns>
    List<GoogleSheetsRider> GetAllRiders();
}
