using System.ComponentModel.DataAnnotations;

namespace Prestigelisten.Core.Models;

public class Nation : IEntity
{
    public int Id { get; set; }

    public required string Name { get; set; }

    [StringLength(2, MinimumLength = 2)]
    public required string Code { get; set; }

    public bool Active { get; set; }

    public int Points { get; set; }

    public int ActivePoints { get; set; }
}
