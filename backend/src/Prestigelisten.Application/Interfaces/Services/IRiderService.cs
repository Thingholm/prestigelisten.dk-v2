using Prestigelisten.Application.DTOs;

namespace Prestigelisten.Application.Interfaces.Services;

public interface IRiderService
{
    Task<SyncRidersResultDTO> SyncRidersFromGoogleSheetsAsync();
}
