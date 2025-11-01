namespace Prestigelisten.Core.Models;

public class Race
{
    public int Id { get; set; }

    public bool Active { get; set; }

    public string? ActiveSpanString { get; set; }

    public required RaceClass RaceClass { get; set; }

    public required MetaRace MetaRace { get; set; }
}
