namespace Prestigelisten.Core.Models;

public class MetaRace : IEntity
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? ColorHex { get; set; }

    public bool DarkText { get; set; }

    public Nation? Nation { get; set; }

    public Image? Image { get; set; }
}
