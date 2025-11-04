namespace Prestigelisten.Integrations.GoogleSheets.Services;

public class GoogleSheetsRidersService : IGoogleSheetsRidersService
{
    private readonly IConnector _connector;
    private readonly ILogger<GoogleSheetsRidersService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;

    public GoogleSheetsRidersService(
        IConnector connector,
        ILogger<GoogleSheetsRidersService> logger,
        IOptions<GoogleSheetsOptions> options
    )
    {
        _connector = connector;
        _logger = logger;
        _options = options;
    }

    public List<GoogleSheetsRider> GetAllRiders()
    {
        var alltimeRiders = _connector.GetRidersAllTimeSheetValues();
        var activeRiders = _connector.GetRidersActiveSheetValues();

        if (alltimeRiders is null || activeRiders is null)
        {
            _logger.LogError(
                "Could not retrieve sheet values from riders alltime or riders active list"
            );
            return [];
        }

        var mergedRidersList = new List<GoogleSheetsRider>();
        foreach (var rider in alltimeRiders.Skip(1))
        {
            var activeRider = activeRiders.FirstOrDefault(r =>
                r[_options.Value.RidersActiveSheet.ColumnIndexes.Name]
                    .Equals(
                        rider[_options.Value.RidersAllTimeSheet.ColumnIndexes.Name],
                        StringComparison.OrdinalIgnoreCase
                    )
            );

            mergedRidersList.Add(
                new GoogleSheetsRider
                {
                    Name = rider[_options.Value.RidersAllTimeSheet.ColumnIndexes.Name],
                    Nation = rider[_options.Value.RidersAllTimeSheet.ColumnIndexes.Nation],
                    Year = int.TryParse(
                        rider[_options.Value.RidersAllTimeSheet.ColumnIndexes.Year],
                        out var yearValue
                    )
                        ? yearValue
                        : null,
                    Team = activeRider?[_options.Value.RidersActiveSheet.ColumnIndexes.Team],
                    IsActive = activeRider is not null,
                }
            );
        }

        return mergedRidersList;
    }
}
