using Prestigelisten.Integrations.GoogleSheets.Helpers;

namespace Prestigelisten.Integrations.GoogleSheets.Services;

public class GoogleSheetsResultsService : IGoogleSheetsResultsService
{
    private readonly IConnector _connector;
    private readonly ILogger<GoogleSheetsResultsService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;

    public GoogleSheetsResultsService(
        IConnector connector,
        ILogger<GoogleSheetsResultsService> logger,
        IOptions<GoogleSheetsOptions> options
    )
    {
        _connector = connector;
        _logger = logger;
        _options = options;
    }

    public async Task<List<GoogleSheetsResult>> GetResultsAsync(int? year = null)
    {
        var sheetValues = _connector.GetResultsSheetValues();
        var resultPlaceholders = await GetResultPlaceholdersFromCSVAsync();

        var headRow = sheetValues.FirstOrDefault();
        var results = new List<GoogleSheetsResult>();
        foreach (var row in sheetValues.Skip(1))
        {
            var rowYear = int.TryParse(row[0], out var yearValue) ? yearValue : 0;

            if (rowYear <= 0 || (year is not null && rowYear != year))
            {
                continue;
            }

            for (var i = 1; i < row.Count; i++)
            {
                var resultCell = row[i];
                var resultName = headRow?[i];

                if (string.IsNullOrWhiteSpace(resultCell) || string.IsNullOrWhiteSpace(resultName))
                {
                    continue;
                }

                var (raceName, resultType, placement, stage) =
                    GoogleSheetsResultHelper.ParseResultString(resultName);

                var result = new GoogleSheetsResult
                {
                    Name = raceName,
                    ResultType = resultType,
                    Placement = placement,
                    Stage = stage,
                    Year = rowYear,
                    RiderName = resultCell,
                    ColumnIndex = i,
                };

                var resultPlaceholder = resultPlaceholders.FirstOrDefault(placeholder =>
                    placeholder.Result.Equals(resultName, StringComparison.OrdinalIgnoreCase)
                    && placeholder.PlaceholderYear == rowYear
                );

                if (resultPlaceholder is not null)
                {
                    result.Year = resultPlaceholder.Year;
                }

                results.Add(result);
            }
        }

        return results;
    }

    public async Task<List<ResultPlaceholder>> GetResultPlaceholdersFromCSVAsync()
    {
        var rows = (await CSVHelper.ReadAsStringAsync("Data/result-placeholder.csv")).Split("\n");

        var resultPlaceholders = new List<ResultPlaceholder>();
        foreach (var row in rows.Skip(1))
        {
            var cells = row.Split(",");

            if (cells.Length > 4)
            {
                continue;
            }

            var year = int.TryParse(cells[1], out var yearValue) ? yearValue : 0;
            var placeholderYear = int.TryParse(cells[2], out var placeholderValue)
                ? placeholderValue
                : 0;

            if (year <= 0 || placeholderYear <= 0)
            {
                continue;
            }

            resultPlaceholders.Add(
                new ResultPlaceholder
                {
                    Result = cells[0],
                    Year = year,
                    PlaceholderYear = placeholderYear,
                    RiderName = cells[3].Replace("\r", ""),
                }
            );
        }

        return resultPlaceholders;
    }
}
