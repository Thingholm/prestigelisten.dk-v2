using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Core.Models;

public class Image : IEntity
{
    public int Id { get; set; }

    public string? Credit { get; set; }

    public string? CreditUrl { get; set; }

    public string? ImageUrl { get; set; }
}
