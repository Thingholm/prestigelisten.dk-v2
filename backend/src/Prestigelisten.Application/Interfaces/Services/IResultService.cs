using Prestigelisten.Application.DTOs;

namespace Prestigelisten.Application.Interfaces.Services;

public interface IResultService
{
    Task<List<Result>> SyncAllResults();

    Task<List<Result>> SyncLatestResults();
}
