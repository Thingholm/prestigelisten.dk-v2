namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

public class GoogleSheetsResult
{
    public required string Result { get; set; }

    public int Year { get; set; }

    public required string RiderName { get; set; }

    /// <summary>
    /// Index of the column for the result to distinct days in leaders jersey results
    /// </summary>
    public int ColumnIndex { get; set; }
}
