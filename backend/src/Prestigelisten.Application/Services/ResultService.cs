using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prestigelisten.Application.Helpers;
using Prestigelisten.Application.Interfaces.Services;
using Prestigelisten.Core.Enums;
using Prestigelisten.Core.Helpers;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;
using Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;
using Prestigelisten.Persistence;

namespace Prestigelisten.Application.Services;

public class ResultService : IResultService
{
    private readonly IRaceRepository _races;
    private readonly IRiderRepository _riders;
    private readonly IBaseRepository<RaceDate> _raceDates;
    private readonly IResultRepository _results;
    private readonly IPointSystemRepository _pointSystem;
    private readonly ISeasonService _seasonService;
    private readonly IGoogleSheetsResultsService _googleSheetsResultsService;
    private readonly IRiderService _riderService;
    private readonly IOptions<DbOptions> _dbOptions;
    private readonly ILogger<ResultService> _logger;

    public ResultService(
        IRaceRepository raceRepository,
        IRiderRepository riderRepository,
        IBaseRepository<RaceDate> raceDateRepository,
        IResultRepository resultRepository,
        IPointSystemRepository pointSystemRepository,
        ISeasonService seasonService,
        IGoogleSheetsResultsService googleSheetsResultsService,
        IRiderService riderService,
        IOptions<DbOptions> dbOptions,
        ILogger<ResultService> logger
    )
    {
        _races = raceRepository;
        _riders = riderRepository;
        _raceDates = raceDateRepository;
        _results = resultRepository;
        _pointSystem = pointSystemRepository;
        _seasonService = seasonService;
        _googleSheetsResultsService = googleSheetsResultsService;
        _riderService = riderService;
        _dbOptions = dbOptions;
        _logger = logger;
    }

    public async Task<List<Result>> SyncAllResults()
    {
        await _riderService.SyncRidersFromGoogleSheetsAsync();

        var googleSheetsResults = await _googleSheetsResultsService.GetResultsAsync();
        if (googleSheetsResults.Count <= 0)
        {
            _logger.LogError("Failed to retrieve results from Google Sheets");
        }

        var lookupData = GetLookupData();
        _results.RemoveAll();
        await _results.SaveChangesAsync();

        ResetRiderAndNationData(lookupData.Riders);
        await _riders.SaveChangesAsync();

        var newResults = ProcessSheetResults(googleSheetsResults, lookupData);

        const int batchSize = 1000;

        foreach (var batch in newResults.Chunk(batchSize))
        {
            _results.AddRange(batch);
            await _results.SaveChangesAsync();
        }
        await _riders.SaveChangesAsync();

        await _seasonService.CalculateAllSeasonsPointsAndRanks();

        return newResults;
    }

    public async Task<List<Result>> SyncLatestResults()
    {
        await _riderService.SyncRidersFromGoogleSheetsAsync();

        var currentYear = DateTime.UtcNow.Year;

        var googleSheetsResults = await _googleSheetsResultsService.GetResultsAsync(currentYear);
        if (googleSheetsResults.Count <= 0)
        {
            _logger.LogError("Failed to retrieve results from Google Sheets");
        }

        var lookupData = GetLookupData(currentYear);

        var newResults = ProcessSheetResults(googleSheetsResults, lookupData, lookupData.ExistingResultSheetIndices);

        await _results.SaveChangesAsync();
        await _riders.SaveChangesAsync();

        await _seasonService.CalculateSeasonsPointsAndRanksForYear(currentYear);

        return newResults;
    }

    private LookupData GetLookupData(int? year = null)
    {
        var riders = DictionaryHelper.ToLookup(_riders, rider => rider.FullName);
        var races = DictionaryHelper.ToLookup(_races, race => race.NameWithActiveSpanString);
        var raceDates = _raceDates.GetAll();
        var pointSystem = _pointSystem.GetAll();
        var existingResultSheetIndices = _results.Find(result => result.Year == year).Select(result => result.SheetIndex).ToList().ToHashSet();

        return new LookupData(riders, races, raceDates, pointSystem, existingResultSheetIndices);
    }

    private static void ResetRiderAndNationData(Dictionary<string, Rider> riders)
    {
        foreach (var rider in riders.Values)
        {
            rider.Points = 0;
            rider.Seasons = [];
            rider.Nation.Seasons = [];
            rider.Nation.Points = 0;
            rider.Nation.ActivePoints = 0;
        }
    }

    private List<Result> ProcessSheetResults(
        List<GoogleSheetsResult> sheetResults,
        LookupData lookupData,
        HashSet<int>? existingResultSheetIndices = null
    )
    {
        var newResults = new List<Result>();

        foreach (var sheetResult in sheetResults)
        {
            lookupData.Races.TryGetValue(sheetResult.Name, out var race);
            if (race is null)
            {
                _logger.LogError(
                    "Could not find race {race} - {year} ({result})",
                    sheetResult.Name,
                    sheetResult.Year,
                    sheetResult.Placement
                );
                continue;
            }

            lookupData.Riders.TryGetValue(sheetResult.RiderName, out var rider);
            if (rider is null)
            {
                _logger.LogWarning(
                    "Could not find rider {riderName} for result {year}: {result}",
                    sheetResult.RiderName,
                    sheetResult.Year,
                    sheetResult.Name
                );
                continue;
            }

            if (existingResultSheetIndices?.Contains(sheetResult.ColumnIndex) == true)
            {
                continue;
            }

            var result = CreateResult(sheetResult, race, rider, lookupData.RaceDates);

            var resultPoints = PointSystemHelper.GetPointSystemForResult(lookupData.PointSystem, result)?.Points ?? 0;

            ProcessRiderPoints(result, rider, resultPoints);
            ProcessNationPoints(result, rider, resultPoints);

            newResults.Add(result);
        }

        return newResults;
    }

    private static Result CreateResult(
        GoogleSheetsResult sheetResult,
        Race race,
        Rider rider,
        IEnumerable<RaceDate> raceDates
    )
    {
        var raceDate = raceDates.FirstOrDefault(rd =>
            rd.Date.Year == sheetResult.Year
            && rd.Stage == sheetResult.Stage
            && race.Equals(rd.Race)
        );

        return new Result
        {
            Race = race,
            Year = sheetResult.Year,
            Placement = sheetResult.Placement,
            Stage = sheetResult.Stage,
            SheetIndex = sheetResult.ColumnIndex,
            RaceDate = raceDate,
            Rider = rider,
            ResultType = sheetResult.ResultType,
        };
    }

    private static void ProcessRiderPoints(Result result, Rider rider, int resultPoints)
    {
        rider.Points += resultPoints;

        var riderSeason = SeasonHelper.GetOrCreate(
            rider.Seasons,
            result.Year,
            () => new RiderSeason { Rider = rider, Year = result.Year, PointsForYear = 0 }
        );

        riderSeason.PointsForYear += resultPoints;
        result.RiderSeason = riderSeason;
    }

    private void ProcessNationPoints(Result result, Rider rider, int resultPoints)
    {
        if (!_dbOptions.Value.NationalChampionshipsRaceClassIds.Contains(result.Race.RaceClass.Id))
        {
            var prevNationality = rider.PreviousNationalities.FirstOrDefault(prevNationality =>
                (prevNationality.StartYear ?? 0) <= result.Year
                && (prevNationality.EndYear == null || prevNationality.EndYear >= result.Year)
            );
            var nation = prevNationality is not null ? prevNationality.Nation : rider.Nation;

            var nationSeason = SeasonHelper.GetOrCreate(
                nation.Seasons,
                result.Year,
                () => new NationSeason { Nation = nation, Year = result.Year, PointsForYear = 0 }
            );

            nation.Points += resultPoints;
            nation.ActivePoints += rider.Active ? resultPoints : 0;
            nationSeason.PointsForYear += resultPoints;
            result.NationSeason = nationSeason;
        }
    }

    private record LookupData(
        Dictionary<string, Rider> Riders,
        Dictionary<string, Race> Races,
        IEnumerable<RaceDate> RaceDates,
        IEnumerable<PointSystem> PointSystem,
        HashSet<int>? ExistingResultSheetIndices
    );
}