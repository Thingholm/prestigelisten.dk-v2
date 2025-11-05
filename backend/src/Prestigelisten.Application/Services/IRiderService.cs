using Prestigelisten.Application.DTOs;

namespace Prestigelisten.Application.Services;

public interface IRiderService
{
    Task<SyncRidersResultDTO> SyncRidersFromGoogleSheetsAsync();
}
