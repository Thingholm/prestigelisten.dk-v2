using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class ResultRepository(AppDbContext context)
    : BaseRepository<Result>(context),
        IResultRepository
{
    protected override IQueryable<Result> SetupQueryable()
    {
        return base.SetupQueryable()
            .Include(result => result.Rider)
            .Include(result => result.Race)
            .Include(result => result.RaceDate)
            .Include(result => result.RiderSeason)
            .Include(result => result.NationSeason)
            .AsSplitQuery();
    }
}