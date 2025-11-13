namespace Prestigelisten.Persistence;

public class DbOptions
{
    public const string SectionName = "Db";

    public required int[] NationalChampionshipsRaceClassIds { get; set; }
}
