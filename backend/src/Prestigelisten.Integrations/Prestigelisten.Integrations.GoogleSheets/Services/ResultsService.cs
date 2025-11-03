using Prestigelisten.Integrations.GoogleSheets.Helpers;

namespace Prestigelisten.Integrations.GoogleSheets.Services;

public class ResultsService : IResultsService
{
    private readonly IConnector _connector;
    private readonly ILogger<ResultsService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;

    public ResultsService(
        IConnector connector,
        ILogger<ResultsService> logger,
        IOptions<GoogleSheetsOptions> options
    )
    {
        _connector = connector;
        _logger = logger;
        _options = options;
    }

    public List<GoogleSheetsResult> GetAllResults()
    {
        var sheetValues = _connector.GetResultsSheetValues();
        var resultPlaceholders = GetResultPlaceholdersFromCSV();

        var headRow = sheetValues.FirstOrDefault();
        var results = new List<GoogleSheetsResult>();
        foreach (var row in sheetValues.Skip(1))
        {
            var year = int.TryParse(row[0], out var yearValue) ? yearValue : 0;

            if (year <= 0)
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

                var result = new GoogleSheetsResult
                {
                    Result = resultName,
                    Year = year,
                    RiderName = resultCell,
                    ColumnIndex = i,
                };

                var resultPlaceholder = resultPlaceholders.FirstOrDefault(placeholder =>
                    placeholder.Result.Equals(resultName, StringComparison.OrdinalIgnoreCase)
                    && placeholder.PlaceholderYear == year
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

    public List<ResultPlaceholder> GetResultPlaceholdersFromCSV()
    {
        var rows = CSVHelper
            .ReadAsStringAsync("Data/result-placeholder.csv")
            .GetAwaiter()
            .GetResult()
            .Split("\n");

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
