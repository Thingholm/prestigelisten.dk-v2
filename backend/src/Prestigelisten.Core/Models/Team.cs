using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class Team : IEntity
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public Nation? Nation { get; set; }
}
