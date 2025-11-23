using Prestigelisten.Application.Interfaces.Services;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Api.Endpoints;

public static class ResultEndpoints
{
    public static RouteGroupBuilder MapResultEndpoints(this RouteGroupBuilder group)
    {
        var resultsGroup = group.MapGroup("/results").WithTags("Results");

        resultsGroup.MapGet("/sync-all", SyncAllResults)
            .WithName("SyncAllResults")
            .Produces<List<Result>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status500InternalServerError);

        resultsGroup.MapGet("/sync-latest", SyncLatestResults)
            .WithName("SyncLatestResults")
            .Produces<List<Result>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status500InternalServerError);

        return resultsGroup;
    }

    private static async Task<IResult> SyncAllResults(IResultService resultService)
    {
        try
        {
            return Results.Ok((await resultService.SyncAllResults()).Count);
        }
        catch (Exception ex)
        {
            return Results.Problem(
                detail: ex.Message,
                statusCode: 500,
                title: "An error occurred while syncing all results."
            );
        }
    }
    private static async Task<IResult> SyncLatestResults(IResultService resultService)
    {
        try
        {
            return Results.Ok((await resultService.SyncLatestResults()).Count);
        }
        catch (Exception ex)
        {
            return Results.Problem(
                detail: ex.Message,
                statusCode: 500,
                title: "An error occurred while syncing latest results."
            );
        }
    }
}
