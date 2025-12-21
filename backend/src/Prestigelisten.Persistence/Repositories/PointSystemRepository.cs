using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class PointSystemRepository(AppDbContext context)
    : BaseRepository<PointSystem>(context),
        IPointSystemRepository
{
    protected override IQueryable<PointSystem> SetupQueryable()
    {
        return base.SetupQueryable().Include(ps => ps.RaceClass).AsSplitQuery();
    }
}