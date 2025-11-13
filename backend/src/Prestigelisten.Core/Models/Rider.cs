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

    public List<RiderSeason> Seasons { get; set; } = [];

    public List<PreviousNationality> PreviousNationalities { get; set; } = [];

    // Not mapped by EF Core
    public string FullName =>
        string.IsNullOrWhiteSpace(FirstName) ? LastName : $"{FirstName} {LastName}";
}
