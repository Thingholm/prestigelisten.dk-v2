using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class Race : IEntity
{
    public int Id { get; set; }

    public bool Active { get; set; }

    public string? ActiveSpanString { get; set; }

    public required RaceClass RaceClass { get; set; }

    public required MetaRace MetaRace { get; set; }

    // Not mapped by EF Core
    public string NameWithActiveSpanString =>
        string.IsNullOrWhiteSpace(ActiveSpanString)
            ? MetaRace.Name
            : $"{MetaRace.Name} {ActiveSpanString}";
}
