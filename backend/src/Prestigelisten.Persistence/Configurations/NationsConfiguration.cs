using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Configurations;

public class NationsConfiguration : IEntityTypeConfiguration<Nation>
{
    public void Configure(EntityTypeBuilder<Nation> builder)
    {
        builder.HasData(GetSeedData());
    }

    private static IEnumerable<Nation> GetSeedData()
    {
        return
        [
            new Nation { Id = 1, Name = "Italien", Code = "it", Active = true },
            new Nation { Id = 2, Name = "Belgien", Code = "be", Active = true },
            new Nation { Id = 3, Name = "Frankrig", Code = "fr", Active = true },
            new Nation { Id = 4, Name = "Spanien", Code = "es", Active = true },
            new Nation { Id = 5, Name = "Nederlandene", Code = "nl", Active = true },
            new Nation { Id = 6, Name = "Schweiz", Code = "ch", Active = true },
            new Nation { Id = 7, Name = "Tyskland", Code = "de", Active = true },
            new Nation { Id = 8, Name = "Storbritannien", Code = "gb", Active = true },
            new Nation { Id = 9, Name = "USA", Code = "us", Active = true },
            new Nation { Id = 10, Name = "Australien", Code = "au", Active = true },
            new Nation { Id = 11, Name = "Luxembourg", Code = "lu", Active = true },
            new Nation { Id = 12, Name = "Colombia", Code = "co", Active = true },
            new Nation { Id = 13, Name = "Irland", Code = "ie", Active = true },
            new Nation { Id = 14, Name = "Danmark", Code = "dk", Active = true },
            new Nation { Id = 15, Name = "Slovenien", Code = "si", Active = true },
            new Nation { Id = 16, Name = "Rusland", Code = "ru", Active = true },
            new Nation { Id = 17, Name = "Norge", Code = "no", Active = true },
            new Nation { Id = 18, Name = "Slovakiet", Code = "sk", Active = true },
            new Nation { Id = 19, Name = "Portugal", Code = "pt", Active = true },
            new Nation { Id = 20, Name = "Polen", Code = "pl", Active = true },
            new Nation { Id = 21, Name = "Kasakhstan", Code = "kz", Active = true },
            new Nation { Id = 22, Name = "Sverige", Code = "se", Active = true },
            new Nation { Id = 23, Name = "Ukraine", Code = "ua", Active = true },
            new Nation { Id = 24, Name = "Østrig", Code = "at", Active = true },
            new Nation { Id = 25, Name = "Tjekkiet", Code = "cz", Active = true },
            new Nation { Id = 26, Name = "Canada", Code = "ca", Active = true },
            new Nation { Id = 27, Name = "Ecuador", Code = "ec", Active = true },
            new Nation { Id = 28, Name = "Letland", Code = "lv", Active = true },
            new Nation { Id = 29, Name = "Sovjetunionen", Code = "su", Active = false },
            new Nation { Id = 30, Name = "Usbekistan", Code = "uz", Active = true },
            new Nation { Id = 31, Name = "Litauen", Code = "lt", Active = true },
            new Nation { Id = 32, Name = "Sydafrika", Code = "za", Active = true },
            new Nation { Id = 33, Name = "Mexico", Code = "mx", Active = true },
            new Nation { Id = 34, Name = "Estland", Code = "ee", Active = true },
            new Nation { Id = 35, Name = "Belarus", Code = "by", Active = true },
            new Nation { Id = 36, Name = "Venezuela", Code = "ve", Active = true },
            new Nation { Id = 37, Name = "Østtyskland", Code = "dd", Active = false },
            new Nation { Id = 38, Name = "Moldova", Code = "md", Active = true },
            new Nation { Id = 39, Name = "New Zealand", Code = "nz", Active = true },
            new Nation { Id = 40, Name = "Argentina", Code = "ar", Active = true },
            new Nation { Id = 41, Name = "Eritrea", Code = "er", Active = true },
            new Nation { Id = 42, Name = "Costa Rica", Code = "cr", Active = true },
            new Nation { Id = 43, Name = "Ungarn", Code = "hu", Active = true },
            new Nation { Id = 44, Name = "Brasilien", Code = "br", Active = true },
            new Nation { Id = 45, Name = "Grækenland", Code = "gr", Active = true },
            new Nation { Id = 46, Name = "Kroatien", Code = "hr", Active = true },
            new Nation { Id = 47, Name = "Japan", Code = "jp", Active = true },
            new Nation { Id = 48, Name = "Bulgarien", Code = "bg", Active = true },
            new Nation { Id = 49, Name = "Finland", Code = "fi", Active = true },
            new Nation { Id = 50, Name = "Algeriet", Code = "dz", Active = true },
            new Nation { Id = 51, Name = "UAE", Code = "ae", Active = true },
            new Nation { Id = 52, Name = "Kina", Code = "cn", Active = true },
            new Nation { Id = 53, Name = "Tyrkiet", Code = "tr", Active = true },
            new Nation { Id = 54, Name = "Bahrain", Code = "bh", Active = true },
            new Nation { Id = 55, Name = "Israel", Code = "il", Active = true },
            new Nation { Id = 56, Name = "Filippinerne", Code = "ph", Active = true }
        ];
    }
}
