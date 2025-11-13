using Prestigelisten.Core.Enums;

namespace Prestigelisten.Integrations.GoogleSheets.Abstractions.Models;

public class GoogleSheetsResult
{
    public required string Name { get; set; }

    public ResultType ResultType { get; set; }

    public int? Placement { get; set; }

    public int? Stage { get; set; }

    public int Year { get; set; }

    public required string RiderName { get; set; }

    /// <summary>
    /// Index of the column for the result to distinct days in leaders jersey results
    /// </summary>
    public int ColumnIndex { get; set; }
}
