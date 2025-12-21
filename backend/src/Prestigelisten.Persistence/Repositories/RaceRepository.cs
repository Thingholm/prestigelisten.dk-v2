using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class RaceRepository(AppDbContext context) : BaseRepository<Race>(context), IRaceRepository
{
    protected override IQueryable<Race> SetupQueryable()
    {
        return base.SetupQueryable().Include(race => race.MetaRace).AsSplitQuery();
    }
}