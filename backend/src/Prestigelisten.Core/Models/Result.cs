using Prestigelisten.Core.Enums;
using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class Result : IEntity
{
    public int Id { get; set; }

    public int Year { get; set; }

    public int? Placement { get; set; }

    public int? Stage { get; set; }

    public required int SheetIndex { get; set; }

    public ResultType ResultType { get; set; }

    public required Race Race { get; set; }

    public required Rider Rider { get; set; }

    public RaceDate? RaceDate { get; set; }

    public RiderSeason? RiderSeason { get; set; }

    public NationSeason? NationSeason { get; set; }
}
