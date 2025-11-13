using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class RiderRepository(AppDbContext context)
    : BaseRepository<Rider>(context),
        IRiderRepository
{
    protected override IQueryable<Rider> SetupQueryable()
    {
        return base.SetupQueryable()
            .Include(rider => rider.Nation)
            .ThenInclude(nation => nation.Seasons)
            .Include(rider => rider.Team)
            .Include(rider => rider.Seasons)
            .Include(rider => rider.PreviousNationalities).ThenInclude(previousNationality => previousNationality.Nation);
    }
}
