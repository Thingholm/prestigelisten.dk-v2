using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Interfaces.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class RiderSeasonRepository
    : BaseRepository<RiderSeason>,
        IRiderSeasonRepository
{
    public RiderSeasonRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }

    protected override IQueryable<RiderSeason> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(season => season.Rider)
            .AsSplitQuery();
    }
}
