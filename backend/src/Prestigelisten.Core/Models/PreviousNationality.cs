namespace Prestigelisten.Core.Models;

public class PreviousNationality
{
    public int Id { get; set; }

    public int? StartYear { get; set; }

    public int? EndYear { get; set; }

    public required Rider Rider { get; set; }

    public required Nation Nation { get; set; }
}
