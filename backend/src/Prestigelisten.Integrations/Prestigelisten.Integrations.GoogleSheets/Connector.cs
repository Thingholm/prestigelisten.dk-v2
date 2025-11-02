using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;
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

        _sheetsService = new SheetsService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credentials,
            ApplicationName = _options.ApplicationName,
        });
    }

    public ValueRange? GetAllTimeSheetValues()
    {
        _logger.LogInformation("Retrieving all time list");
        return _sheetsService.Spreadsheets.Values.Get(_options.SpreadsheetId, _options.Ranges.AllTimeList).Execute(); 
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
}
