namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

public class ResultPlaceholder
{
    public required string Result { get; set; }

    public required string RiderName { get; set; }

    public int Year { get; set; }

    public int PlaceholderYear { get; set; }
}
