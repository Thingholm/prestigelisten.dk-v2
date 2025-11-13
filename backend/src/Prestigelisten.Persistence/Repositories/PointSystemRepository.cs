using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class PointSystemRepository(AppDbContext context)
    : BaseRepository<PointSystem>(context),
        IPointSystemRepository
{
    protected override IQueryable<PointSystem> SetupQueryable()
    {
        return base.SetupQueryable().Include(ps => ps.RaceClass);
    }
}
