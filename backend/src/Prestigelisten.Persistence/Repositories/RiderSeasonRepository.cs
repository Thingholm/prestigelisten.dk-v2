using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Interfaces.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class RiderSeasonRepository(AppDbContext context)
    : BaseRepository<RiderSeason>(context),
        IRiderSeasonRepository
{
    protected override IQueryable<RiderSeason> SetupQueryable()
    {
        return base.SetupQueryable().Include(season => season.Rider);
    }
}
