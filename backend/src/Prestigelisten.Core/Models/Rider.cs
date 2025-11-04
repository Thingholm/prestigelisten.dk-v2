namespace Prestigelisten.Core.Models;

public class Rider : IEntity
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public required string LastName { get; set; }

    public int? Year { get; set; }

    public bool Active { get; set; }

    public required Nation Nation { get; set; }

    public Team? Team { get; set; }

    public int Points { get; set; }

    public Image? Image { get; set; }
}
