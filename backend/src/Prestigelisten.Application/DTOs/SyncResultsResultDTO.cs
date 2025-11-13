namespace Prestigelisten.Application.DTOs;

public class SyncResultsResultDTO
{
    public List<Result> AddedResults { get; set; } = [];

    public List<Result> UpdatedResults { get; set; } = [];
}
