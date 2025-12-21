using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class NationRepository
    : BaseRepository<Nation>,
        INationRepository
{
    public NationRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }

    protected override IQueryable<Nation> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(nation => nation.Seasons)
            .AsSplitQuery();
    }
}
