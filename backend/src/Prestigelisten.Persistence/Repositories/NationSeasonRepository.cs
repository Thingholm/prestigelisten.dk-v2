using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Interfaces.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class NationSeasonRepository
    : BaseRepository<NationSeason>,
        INationSeasonRepository
{
    public NationSeasonRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }
    protected override IQueryable<NationSeason> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(season => season.Nation)
            .AsSplitQuery();
    }
}
