namespace Prestigelisten.Core.Models;

public class Team
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public Nation? Nation { get; set; }
}
