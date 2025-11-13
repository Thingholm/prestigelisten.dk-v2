using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class NationRepository(AppDbContext context)
    : BaseRepository<Nation>(context),
        INationRepository
{
    protected override IQueryable<Nation> SetupQueryable()
    {
        return base.SetupQueryable().Include(nation => nation.Seasons);
    }
}
