using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class RaceClass : IEntity
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public int SortingIndex { get; set; }
}
