using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class RaceRepository : BaseRepository<Race>, IRaceRepository
{
    public RaceRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }

    protected override IQueryable<Race> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(race => race.RaceClass)
            .Include(race => race.MetaRace)
            .AsSplitQuery();
    }
}
