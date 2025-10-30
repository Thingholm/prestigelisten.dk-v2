using Microsoft.EntityFrameworkCore;

namespace Prestigelisten.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<DbContext> options)
        : base(options)
    { }
}
