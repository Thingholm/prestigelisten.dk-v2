using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    public DbSet<Calendar> Calendar { get; set; }

    public DbSet<Image> Images { get; set; }

    public DbSet<MetaRace> MetaRaces { get; set; }

    public DbSet<Nation> Nations { get; set; }

    public DbSet<NationSeason> NationSeasons { get; set; }

    public DbSet<PointSystem> PointSystem { get; set; }

    public DbSet<PreviousNationality> PreviousNationalities { get; set; }

    public DbSet<Race> Races { get; set; }

    public DbSet<RaceClass> RaceClasses { get; set; }

    public DbSet<RaceDate> RaceDates { get; set; }

    public DbSet<Result> Results { get; set; }

    public DbSet<Rider> Riders { get; set; }

    public DbSet<RiderSeason> RiderSeasons { get; set; }

    public DbSet<Team> Teams { get; set; }
}
