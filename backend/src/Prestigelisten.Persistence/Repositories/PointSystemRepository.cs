using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class PointSystemRepository
    : BaseRepository<PointSystem>,
        IPointSystemRepository
{
    public PointSystemRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }
    protected override IQueryable<PointSystem> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(ps => ps.RaceClass)
            .AsSplitQuery();
    }
}
