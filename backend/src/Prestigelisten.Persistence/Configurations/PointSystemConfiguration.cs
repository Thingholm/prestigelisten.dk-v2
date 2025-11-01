using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Enums;

namespace Prestigelisten.Persistence.Configurations;

public class PointSystemConfiguration : IEntityTypeConfiguration<PointSystem>
{
    public void Configure(EntityTypeBuilder<PointSystem> builder)
    {
        builder.HasData(GetSeedData());
    }

    private static IEnumerable<object> GetSeedData()
    {
        return 
        [
            new { Id = 80, Points = 110, RaceClassId = 1, ResultType = (ResultType)1 },
            new { Id = 81, Points = 40, RaceClassId = 1, ResultType = (ResultType)2 },
            new { Id = 82, Points = 18, RaceClassId = 1, ResultType = (ResultType)3 },
            new { Id = 83, Points = 7, RaceClassId = 1, ResultType = (ResultType)4 },
            new { Id = 84, Points = 18, RaceClassId = 1, ResultType = (ResultType)5 },
            new { Id = 85, Points = 18, RaceClassId = 1, ResultType = (ResultType)6 },
            new { Id = 86, Points = 12, RaceClassId = 1, ResultType = (ResultType)7 },
            new { Id = 87, Points = 6, RaceClassId = 1, ResultType = (ResultType)8 },
            new { Id = 88, Points = 3, RaceClassId = 1, ResultType = (ResultType)9 },
            new { Id = 89, Points = 2, RaceClassId = 1, ResultType = (ResultType)10 },
            new { Id = 90, Points = 1, RaceClassId = 1, ResultType = (ResultType)11 },
            new { Id = 91, Points = 70, RaceClassId = 2, ResultType = (ResultType)1 },
            new { Id = 92, Points = 25, RaceClassId = 2, ResultType = (ResultType)2 },
            new { Id = 93, Points = 11, RaceClassId = 2, ResultType = (ResultType)3 },
            new { Id = 94, Points = 4, RaceClassId = 2, ResultType = (ResultType)4 },
            new { Id = 95, Points = 11, RaceClassId = 2, ResultType = (ResultType)5 },
            new { Id = 96, Points = 11, RaceClassId = 2, ResultType = (ResultType)6 },
            new { Id = 97, Points = 8, RaceClassId = 2, ResultType = (ResultType)7 },
            new { Id = 98, Points = 3, RaceClassId = 2, ResultType = (ResultType)8 },
            new { Id = 99, Points = 2, RaceClassId = 2, ResultType = (ResultType)9 },
            new { Id = 100, Points = 1, RaceClassId = 2, ResultType = (ResultType)11 },
            new { Id = 101, Points = 50, RaceClassId = 3, ResultType = (ResultType)1 },
            new { Id = 102, Points = 13, RaceClassId = 3, ResultType = (ResultType)2 },
            new { Id = 103, Points = 4, RaceClassId = 3, ResultType = (ResultType)3 },
            new { Id = 104, Points = 25, RaceClassId = 4, ResultType = (ResultType)1 },
            new { Id = 105, Points = 5, RaceClassId = 4, ResultType = (ResultType)2 },
            new { Id = 106, Points = 3, RaceClassId = 4, ResultType = (ResultType)7 },
            new { Id = 107, Points = 20, RaceClassId = 5, ResultType = (ResultType)1 },
            new { Id = 108, Points = 4, RaceClassId = 5, ResultType = (ResultType)2 },
            new { Id = 109, Points = 15, RaceClassId = 6, ResultType = (ResultType)1 },
            new { Id = 110, Points = 3, RaceClassId = 6, ResultType = (ResultType)2 },
            new { Id = 111, Points = 2, RaceClassId = 6, ResultType = (ResultType)7 },
            new { Id = 112, Points = 14, RaceClassId = 7, ResultType = (ResultType)1 },
            new { Id = 113, Points = 2, RaceClassId = 7, ResultType = (ResultType)2 },
            new { Id = 114, Points = 8, RaceClassId = 8, ResultType = (ResultType)1 },
            new { Id = 115, Points = 8, RaceClassId = 9, ResultType = (ResultType)1 },
            new { Id = 116, Points = 4, RaceClassId = 10, ResultType = (ResultType)1 },
            new { Id = 117, Points = 4, RaceClassId = 11, ResultType = (ResultType)1 },
            new { Id = 118, Points = 5, RaceClassId = 12, ResultType = (ResultType)1 },
            new { Id = 119, Points = 2, RaceClassId = 13, ResultType = (ResultType)1 },
            new { Id = 120, Points = 3, RaceClassId = 14, ResultType = (ResultType)1 },
            new { Id = 121, Points = 1, RaceClassId = 15, ResultType = (ResultType)1 },
            new { Id = 122, Points = 65, RaceClassId = 16, ResultType = (ResultType)12 },
            new { Id = 123, Points = 30, RaceClassId = 16, ResultType = (ResultType)13 },
            new { Id = 124, Points = 25, RaceClassId = 16, ResultType = (ResultType)14 },
            new { Id = 125, Points = 40, RaceClassId = 17, ResultType = (ResultType)12 },
            new { Id = 126, Points = 20, RaceClassId = 17, ResultType = (ResultType)13 },
            new { Id = 127, Points = 16, RaceClassId = 17, ResultType = (ResultType)14 },
            new { Id = 128, Points = 80, RaceClassId = 18, ResultType = (ResultType)12 },
            new { Id = 129, Points = 23, RaceClassId = 18, ResultType = (ResultType)13 },
            new { Id = 130, Points = 17, RaceClassId = 18, ResultType = (ResultType)14 },
            new { Id = 131, Points = 4, RaceClassId = 18, ResultType = (ResultType)3 },
            new { Id = 132, Points = 35, RaceClassId = 19, ResultType = (ResultType)12 },
            new { Id = 133, Points = 10, RaceClassId = 19, ResultType = (ResultType)13 },
            new { Id = 134, Points = 7, RaceClassId = 19, ResultType = (ResultType)14 },
            new { Id = 135, Points = 18, RaceClassId = 20, ResultType = (ResultType)12 },
            new { Id = 136, Points = 3, RaceClassId = 20, ResultType = (ResultType)13 },
            new { Id = 137, Points = 2, RaceClassId = 20, ResultType = (ResultType)14 },
            new { Id = 138, Points = 10, RaceClassId = 21, ResultType = (ResultType)12 },
            new { Id = 139, Points = 2, RaceClassId = 21, ResultType = (ResultType)13 },
            new { Id = 140, Points = 1, RaceClassId = 21, ResultType = (ResultType)14 },
            new { Id = 141, Points = 20, RaceClassId = 22, ResultType = (ResultType)12 },
            new { Id = 142, Points = 8, RaceClassId = 22, ResultType = (ResultType)13 },
            new { Id = 143, Points = 5, RaceClassId = 22, ResultType = (ResultType)14 },
            new { Id = 144, Points = 15, RaceClassId = 23, ResultType = (ResultType)12 },
            new { Id = 145, Points = 6, RaceClassId = 23, ResultType = (ResultType)13 },
            new { Id = 146, Points = 4, RaceClassId = 23, ResultType = (ResultType)14 },
            new { Id = 147, Points = 10, RaceClassId = 24, ResultType = (ResultType)1 },
            new { Id = 148, Points = 2, RaceClassId = 24, ResultType = (ResultType)2 },
            new { Id = 149, Points = 40, RaceClassId = 26, ResultType = (ResultType)1 },
            new { Id = 150, Points = 12, RaceClassId = 26, ResultType = (ResultType)2 },
            new { Id = 151, Points = 4, RaceClassId = 26, ResultType = (ResultType)3 },
            new { Id = 152, Points = 5, RaceClassId = 26, ResultType = (ResultType)5 },
            new { Id = 153, Points = 5, RaceClassId = 26, ResultType = (ResultType)6 },
            new { Id = 154, Points = 5, RaceClassId = 26, ResultType = (ResultType)7 },
            new { Id = 155, Points = 10, RaceClassId = 27, ResultType = (ResultType)12 },
            new { Id = 156, Points = 2, RaceClassId = 27, ResultType = (ResultType)13 },
            new { Id = 157, Points = 1, RaceClassId = 27, ResultType = (ResultType)14 }
        ];
    }
}