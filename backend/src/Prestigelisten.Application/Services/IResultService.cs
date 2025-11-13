using Prestigelisten.Application.DTOs;

namespace Prestigelisten.Application.Services;

public interface IResultService
{
    Task<SyncResultsResultDTO> SyncAllResults();
}
