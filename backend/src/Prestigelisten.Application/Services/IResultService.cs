using Prestigelisten.Application.DTOs;

namespace Prestigelisten.Application.Services;

public interface IResultService
{
    Task<List<Result>> SyncAllResults();
}
