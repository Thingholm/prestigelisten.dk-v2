using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class Calendar : IEntity
{
    public int Id { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public required Race Race { get; set; }
}
