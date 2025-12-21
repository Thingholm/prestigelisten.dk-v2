using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class RiderRepository
    : BaseRepository<Rider>,
        IRiderRepository
{
    public RiderRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }

    protected override IQueryable<Rider> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(rider => rider.Nation)
            .ThenInclude(nation => nation.Seasons)
            .Include(rider => rider.Team)
            .Include(rider => rider.Seasons)
            .Include(rider => rider.PreviousNationalities).ThenInclude(previousNationality => previousNationality.Nation)
            .AsSplitQuery();
    }
}
