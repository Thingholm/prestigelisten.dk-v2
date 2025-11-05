namespace Prestigelisten.Application.DTOs;

public class SyncRidersResultDTO
{
    public List<Rider> AddedRiders { get; set; } = [];

    public List<Rider> UpdatedRiders { get; set; } = [];

    public List<Nation> AddedNations { get; set; } = [];

    public List<Team> AddedTeams { get; set; } = [];
}
