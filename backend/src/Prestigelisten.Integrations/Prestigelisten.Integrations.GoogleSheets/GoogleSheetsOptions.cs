namespace Prestigelisten.Integrations.GoogleSheets.Models;

public class GoogleSheetsOptions
{
    public const string SectionName = "GoogleSheets";

    public required string ApplicationName { get; set; }

    public required string SpreadsheetId { get; set; }

    public required string ServiceCredentialsJson { get; set; }

    public required GoogleSheetsRanges Ranges { get; set; }
}

public class GoogleSheetsRanges
{
    public required string AllTimeList { get; set; }
}