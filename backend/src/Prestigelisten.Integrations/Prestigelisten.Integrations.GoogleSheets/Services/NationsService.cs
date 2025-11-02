namespace Prestigelisten.Integrations.GoogleSheets.Services;

public class NationsService : INationsService
{
    private readonly IConnector _connector;
    private readonly ILogger<NationsService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;

    public NationsService(
        IConnector connector,
        ILogger<NationsService> logger,
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
