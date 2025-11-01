using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Configurations;

public class RaceClassesConfiguration : IEntityTypeConfiguration<RaceClass>
{
    public void Configure(EntityTypeBuilder<RaceClass> builder)
    {
        builder.HasData(GetSeedData());
    }

    private static IEnumerable<RaceClass> GetSeedData()
    {
        return
        [
            new RaceClass { Id = 1, Name = "Tour de France", SortingIndex = 1 },
            new RaceClass { Id = 2, Name = "Grand Tour", SortingIndex = 2 },
            new RaceClass { Id = 3, Name = "Monument", SortingIndex = 4 },
            new RaceClass { Id = 4, Name = "WTT A", SortingIndex = 5 },
            new RaceClass { Id = 5, Name = "WTC A", SortingIndex = 6 },
            new RaceClass { Id = 6, Name = "WTT B", SortingIndex = 7 },
            new RaceClass { Id = 7, Name = "WTC B", SortingIndex = 8 },
            new RaceClass { Id = 8, Name = "WTT C", SortingIndex = 9 },
            new RaceClass { Id = 9, Name = "WTC C", SortingIndex = 10 },
            new RaceClass { Id = 10, Name = "WTT D", SortingIndex = 11 },
            new RaceClass { Id = 11, Name = "WTC D", SortingIndex = 12 },
            new RaceClass { Id = 12, Name = "Nationale mesterskaber A", SortingIndex = 24 },
            new RaceClass { Id = 13, Name = "Nationale mesterskaber i ITT A", SortingIndex = 25 },
            new RaceClass { Id = 14, Name = "Nationale mesterskaber B", SortingIndex = 26 },
            new RaceClass { Id = 15, Name = "Nationale mesterskaber i ITT B", SortingIndex = 27 },
            new RaceClass { Id = 16, Name = "OL", SortingIndex = 13 },
            new RaceClass { Id = 17, Name = "OL ITT", SortingIndex = 14 },
            new RaceClass { Id = 18, Name = "VM", SortingIndex = 17 },
            new RaceClass { Id = 19, Name = "VM ITT", SortingIndex = 18 },
            new RaceClass { Id = 20, Name = "EM", SortingIndex = 20 },
            new RaceClass { Id = 21, Name = "EM ITT", SortingIndex = 21 },
            new RaceClass { Id = 22, Name = "OL (amatør)", SortingIndex = 15 },
            new RaceClass { Id = 23, Name = "OL ITT (amatør)", SortingIndex = 16 },
            new RaceClass { Id = 24, Name = "Parløb", SortingIndex = 22 },
            new RaceClass { Id = 25, Name = "Andre", SortingIndex = 23 },
            new RaceClass { Id = 26, Name = "Grand Tour B", SortingIndex = 3 },
            new RaceClass { Id = 27, Name = "VM (amatør)", SortingIndex = 19 }
        ];
    }
}