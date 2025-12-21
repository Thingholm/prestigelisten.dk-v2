using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Repositories;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Repositories;

public class NationRepository(AppDbContext context)
    : BaseRepository<Nation>(context),
        INationRepository
{
    protected override IQueryable<Nation> SetupQueryable()
    {
        return base.SetupQueryable().Include(nation => nation.Seasons).AsSplitQuery();
    }
}