using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prestigelisten.Application.Helpers;
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
    private readonly IGoogleSheetsResultsService _googleSheetsResultsService;
    private readonly IOptions<DbOptions> _dbOptions;
    private readonly ILogger<ResultService> _logger;

    public ResultService(
        IRaceRepository raceRepository,
        IRiderRepository riderRepository,
        IBaseRepository<RaceDate> raceDateRepository,
        IResultRepository resultRepository,
        IPointSystemRepository pointSystemRepository,
        IGoogleSheetsResultsService googleSheetsResultsService,
        IOptions<DbOptions> dbOptions,
        ILogger<ResultService> logger
    )
    {
        _races = raceRepository;
        _riders = riderRepository;
        _raceDates = raceDateRepository;
        _results = resultRepository;
        _pointSystem = pointSystemRepository;
        _googleSheetsResultsService = googleSheetsResultsService;
        _dbOptions = dbOptions;
        _logger = logger;
    }

    public async Task<SyncResultsResultDTO> SyncAllResults()
    {
        var googleSheetsResults = await _googleSheetsResultsService.GetAllResultsAsync();

        if (googleSheetsResults.Count <= 0)
        {
            _logger.LogError("Failed to retrieve results from Google Sheets");
        }

        var riders = _riders
            .GetAll()
            .ToDictionary(
                rider => rider.FullName,
                rider => rider,
                StringComparer.OrdinalIgnoreCase
            );
        var races = _races
            .GetAll()
            .ToDictionary(
                race => race.NameWithActiveSpanString,
                race => race,
                StringComparer.OrdinalIgnoreCase
            );
        var raceDates = _raceDates.GetAll();
        var pointSystem = _pointSystem.GetAll();

        _results.RemoveAll();
        foreach (var rider in riders.Values)
        {
            rider.Points = 0;
            rider.Seasons = [];
            rider.Nation.Seasons = [];
            rider.Nation.Points = 0;
            rider.Nation.ActivePoints = 0;
        }

        var lowestYear = googleSheetsResults.Min(r => r.Year);

        var resultDTO = new SyncResultsResultDTO();
        for (var year = lowestYear; year <= DateTime.UtcNow.Year; year++)
        {
            foreach (var rider in riders.Values)
            {
                var previousSeason = rider.Seasons.FirstOrDefault(season =>
                    season.Year == year - 1
                );
                rider.Seasons.Add(
                    new RiderSeason
                    {
                        Rider = rider,
                        Year = year,
                        PointsForYear = 0,
                        PointsAllTime = previousSeason?.PointsAllTime ?? 0,
                    }
                );

                var nationSeason = rider.Seasons.FirstOrDefault(season => season.Year == year);
                if (nationSeason is not null)
                {
                    var previousNationSeason = rider.Nation.Seasons.FirstOrDefault(season =>
                        season.Year == year - 1
                    );
                    rider.Nation.Seasons.Add(
                        new NationSeason
                        {
                            Nation = rider.Nation,
                            Year = year,
                            PointsForYear = 0,
                            PointsAllTime = previousNationSeason?.PointsAllTime ?? 0,
                        }
                    );
                }
            }

            foreach (
                var sheetResult in googleSheetsResults.Where(sheetResult =>
                    sheetResult.Year == year
                )
            )
            {
                races.TryGetValue(sheetResult.Name, out var race);
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

                riders.TryGetValue(sheetResult.RiderName, out var rider);
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

                var raceDate = raceDates.FirstOrDefault(rd =>
                    rd.Date.Year == sheetResult.Year
                    && rd.Stage == sheetResult.Stage
                    && race.Equals(rd.Race)
                );

                var result = new Result
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

                var resultPoints =
                    PointSystemHelper.GetPointSystemForResult(pointSystem, result)?.Points ?? 0;
                rider.Points += resultPoints;

                var riderSeason = rider.Seasons.FirstOrDefault(season =>
                    season.Year == result.Year
                );
                if (riderSeason is null)
                {
                    var newRiderSeason = new RiderSeason
                    {
                        Rider = rider,
                        Year = result.Year,
                        PointsForYear = 0,
                    };
                    rider.Seasons.Add(newRiderSeason);
                    riderSeason = newRiderSeason;
                }

                riderSeason.PointsForYear += resultPoints;
                result.RiderSeason = riderSeason;

                if (
                    !_dbOptions.Value.NationalChampionshipsRaceClassIds.Contains(
                        result.Race.RaceClass.Id
                    )
                )
                {
                    var prevNationality = rider.PreviousNationalities.FirstOrDefault(
                        prevNationality =>
                            (prevNationality.StartYear ?? 0) <= result.Year
                            && (
                                prevNationality.EndYear == null
                                || prevNationality.EndYear >= result.Year
                            )
                    );
                    var nation = prevNationality is not null
                        ? prevNationality.Nation
                        : rider.Nation;

                    var nationSeason = rider.Nation.Seasons.FirstOrDefault(season =>
                        season.Year == result.Year
                    );
                    if (nationSeason is null)
                    {
                        var newNationSeason = new NationSeason
                        {
                            Nation = rider.Nation,
                            Year = result.Year,
                            PointsForYear = 0,
                        };
                        rider.Nation.Seasons.Add(newNationSeason);
                        nationSeason = newNationSeason;
                    }

                    rider.Nation.Points += resultPoints;
                    if (rider.Active)
                    {
                        rider.Nation.ActivePoints += resultPoints;
                    }
                    nationSeason.PointsForYear += resultPoints;
                    result.NationSeason = nationSeason;
                }

                resultDTO.AddedResults.Add(result);

                _results.AddOrUpdate(result);
            }
        }

        await _results.SaveChangesAsync();
        await _riders.SaveChangesAsync();

        return resultDTO;
    }
}
