using Prestigelisten.Core.Enums;

namespace Prestigelisten.Core.Models;

public class PointSystem
{
    public int Id { get; set; }

    public int Points { get; set; }

    public required RaceClass RaceClass { get; set; }

    public ResultType ResultType { get; set; }
}
