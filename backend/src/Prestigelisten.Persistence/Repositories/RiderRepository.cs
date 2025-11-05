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
        return base.SetupQueryable().Include(rider => rider.Nation).Include(rider => rider.Team);
    }
}
