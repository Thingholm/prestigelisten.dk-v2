using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class ResultRepository
    : BaseRepository<Result>,
        IResultRepository
{
    public ResultRepository(IDbContextFactory<AppDbContext> factory)
        : base(factory)
    {
    }
    protected override IQueryable<Result> SetupQueryable(AppDbContext context)
    {
        return base.SetupQueryable(context)
            .Include(result => result.Rider)
            .Include(result => result.Race)
            .Include(result => result.RaceDate)
            .Include(result => result.RiderSeason)
            .Include(result => result.NationSeason)
            .AsSplitQuery();
    }
}
