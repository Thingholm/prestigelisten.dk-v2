using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Interfaces.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class NationSeasonRepository(AppDbContext context)
    : BaseRepository<NationSeason>(context),
        INationSeasonRepository
{
    protected override IQueryable<NationSeason> SetupQueryable()
    {
        return base.SetupQueryable().Include(season => season.Nation).AsSplitQuery();
    }
}