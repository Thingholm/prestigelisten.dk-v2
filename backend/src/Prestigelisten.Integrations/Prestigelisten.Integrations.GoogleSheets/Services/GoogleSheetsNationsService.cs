namespace Prestigelisten.Integrations.GoogleSheets.Services;

public class GoogleSheetsNationsService : IGoogleSheetsNationsService
{
    private readonly IConnector _connector;
    private readonly ILogger<GoogleSheetsNationsService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;

    public GoogleSheetsNationsService(
        IConnector connector,
        ILogger<GoogleSheetsNationsService> logger,
        IOptions<GoogleSheetsOptions> options
    )
    {
        _connector = connector;
        _logger = logger;
        _options = options;
    }

    public List<GoogleSheetsNation> GetAllNations()
    {
        var nations = _connector.GetNationsSheetValues();

        if (nations is null)
        {
            _logger.LogError("Could not retrieve sheet values from nations list");
            return [];
        }

        return nations
            .Skip(1)
            .Select(nation => new GoogleSheetsNation
            {
                Name = nation[_options.Value.NationsSheet.ColumnIndexes.Name],
            })
            .ToList();
    }
}
