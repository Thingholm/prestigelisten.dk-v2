namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

public class GoogleSheetsRider
{
    public required string Name { get; set; }

    public required string Nation { get; set; }

    public string? Team { get; set; }

    public bool IsActive { get; set; }

    public int? Year { get; set; }
}
