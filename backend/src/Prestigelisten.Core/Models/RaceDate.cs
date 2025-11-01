namespace Prestigelisten.Core.Models;

public class RaceDate
{
    public int Id { get; set; }

    public int? Stage { get; set; }

    public DateOnly Date { get; set; }

    public required Race Race { get; set; }
}
