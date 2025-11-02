using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prestigelisten.Integrations.GoogleSheets.Models;

namespace Prestigelisten.Integrations.GoogleSheets;

public class Connector : IConnector
{
    private readonly GoogleSheetsOptions _options;
    private readonly ILogger<Connector> _logger;
    private readonly SheetsService _sheetsService;

    public Connector(IOptions<GoogleSheetsOptions> options, ILogger<Connector> logger)
    {
        _options = options.Value;
        _logger = logger;

        ValidateOptions();

        var credentials = GoogleCredential
            .FromJson(_options.ServiceCredentialsJson)
            .CreateScoped(SheetsService.Scope.SpreadsheetsReadonly);

        _sheetsService = new SheetsService(
            new BaseClientService.Initializer
            {
                HttpClientInitializer = credentials,
                ApplicationName = _options.ApplicationName,
            }
        );
    }

    private void ValidateOptions()
    {
        if (string.IsNullOrWhiteSpace(_options.ServiceCredentialsJson))
        {
            throw new InvalidOperationException("ServiceCredentialsJson is required");
        }

        if (string.IsNullOrWhiteSpace(_options.SpreadsheetId))
        {
            throw new InvalidOperationException("SpreadsheedId is required");
        }
    }

    public List<List<string>> GetRidersAllTimeSheetValues()
    {
        _logger.LogInformation("Retrieving riders all time list from Google Sheets");

        var response = _sheetsService
            .Spreadsheets.Values.Get(_options.SpreadsheetId, _options.RidersAllTimeSheet.Range)
            .Execute();

        return ConvertValuesToStrings(response.Values);
    }

    public List<List<string>> GetRidersActiveSheetValues()
    {
        _logger.LogInformation("Retrieving riders active list from Google Sheets");

        var response = _sheetsService
            .Spreadsheets.Values.Get(_options.SpreadsheetId, _options.RidersActiveSheet.Range)
            .Execute();

        return ConvertValuesToStrings(response.Values);
    }

    private static List<List<string>> ConvertValuesToStrings(IList<IList<object>>? values)
    {
        if (values is null)
        {
            return [];
        }

        var convertedList = values.Select(row =>
            row.Select(cell => cell?.ToString() ?? string.Empty).ToList()
        );

        var columnsCount = convertedList.FirstOrDefault()?.Count ?? 0;

        return convertedList.Where(row => row.Count == columnsCount).ToList();
    }
}
