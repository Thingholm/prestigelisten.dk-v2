using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Persistence.Configurations;

public class TeamsConfiguration : IEntityTypeConfiguration<Team>
{
    public void Configure(EntityTypeBuilder<Team> builder)
    {
        builder.HasData(GetSeedData());
    }

    private static IEnumerable<object> GetSeedData()
    {
        return
        [
            new { Id = 1, Name = "UAE Team Emirates - XRG", NationId = 51 },
            new { Id = 2, Name = "Red Bull - BORA - hansgrohe", NationId = 7 },
            new { Id = 3, Name = "Team Picnic PostNL", NationId = 5 },
            new { Id = 4, Name = "Lotto", NationId = 2 },
            new { Id = 5, Name = "XDS Astana Team", NationId = 21 },
            new { Id = 6, Name = "Kinan Racing Team", NationId = (int?)null },
            new { Id = 7, Name = "Toscana Factory Team Vini Fantini", NationId = (int?)null },
            new { Id = 8, Name = "Unibet Tietema Rockets", NationId = 5 },
            new { Id = 9, Name = "Petrolike", NationId = (int?)null },
            new { Id = 10, Name = "REMBE | rad-net", NationId = (int?)null },
            new { Id = 11, Name = "Team Polti VisitMalta", NationId = 1 },
            new { Id = 12, Name = "Orgullo Paisa", NationId = (int?)null },
            new { Id = 13, Name = "Factor Racing", NationId = (int?)null },
            new { Id = 2125, Name = "UAE Team Emirates", NationId = 51 },
            new { Id = 2126, Name = "Israel - Premier Tech", NationId = 55 },
            new { Id = 2127, Name = "BORA - hansgrohe", NationId = 7 },
            new { Id = 2128, Name = "Astana Qazaqstan Team", NationId = 21 },
            new { Id = 2129, Name = "Soudal - Quick Step", NationId = 2 },
            new { Id = 2130, Name = "Movistar Team", NationId = 4 },
            new { Id = 2131, Name = "Alpecin-Deceuninck", NationId = 2 },
            new { Id = 2132, Name = "Team Visma | Lease a Bike", NationId = 5 },
            new { Id = 2133, Name = "INEOS Grenadiers", NationId = 8 },
            new { Id = 2134, Name = "EF Education-EasyPost", NationId = 9 },
            new { Id = 2135, Name = "Uno-X Mobility", NationId = 17 },
            new { Id = 2136, Name = "Team Jayco AlUla", NationId = 10 },
            new { Id = 2137, Name = "Team dsm-firmenich Post NL", NationId = 5 },
            new { Id = 2138, Name = "Team dsm - firmenich", NationId = 5 },
            new { Id = 2139, Name = "Arkéa - B&B Hotels", NationId = 3 },
            new { Id = 2140, Name = "Lidl - Trek", NationId = 9 },
            new { Id = 2141, Name = "Decathlon AG2R La Mondiale Team", NationId = 3 },
            new { Id = 2142, Name = "Cofidis", NationId = 3 },
            new { Id = 2143, Name = "Bahrain - Victorious", NationId = 54 },
            new { Id = 2144, Name = "Tudor Pro Cycling Team", NationId = 6 },
            new { Id = 2145, Name = "Groupama - FDJ", NationId = 3 },
            new { Id = 2146, Name = "Lotto Dstny", NationId = 2 },
            new { Id = 2147, Name = "Team Medellin - EPM", NationId = 12 },
            new { Id = 2148, Name = "Q36.5 Pro Cycling Team", NationId = 6 },
            new { Id = 2149, Name = "VF Group - Bardiani CSF - Faizanè", NationId = 1 },
            new { Id = 2150, Name = "Intermarché - Wanty", NationId = 2 },
            new { Id = 2151, Name = "Nu Colombia", NationId = 12 },
            new { Id = 2152, Name = "TotalEnergies", NationId = 3 },
            new { Id = 2153, Name = "Corratec", NationId = 1 },
            new { Id = 2154, Name = "Equipo Kern Pharma", NationId = 4 },
            new { Id = 2155, Name = "Forte Petrolike - Androni Giocattoli", NationId = 1 },
            new { Id = 2156, Name = "VolkerWessels Cycling Team", NationId = 5 },
            new { Id = 2157, Name = "Team Polti Kometa", NationId = 1 },
            new { Id = 2158, Name = "Caja Rural - Seguros RGA", NationId = 4 },
            new { Id = 2159, Name = "Euskaltel - Euskadi", NationId = 4 },
            new { Id = 2160, Name = "Rad-Net Osswald", NationId = 7 },
            new { Id = 2161, Name = "Team Felt - Felbermayr", NationId = 24 },
            new { Id = 2162, Name = "TDT-Unibet Cycling Team", NationId = 3 },
            new { Id = 2163, Name = "GW Erco Shimano", NationId = 12 },
            new { Id = 2164, Name = "Sabgal / Anicolor", NationId = 19 },
            new { Id = 2165, Name = "Victoria Sports Pro Cycling Team", NationId = 56 },
            new { Id = 2166, Name = "BHS - PL Beton Bornholm", NationId = 14 },
            new { Id = 2167, Name = "Elkov - Kasper", NationId = 25 },
            new { Id = 2168, Name = "Santic - Wibatech", NationId = 7 },
            new { Id = 2169, Name = "Mazowsze Serce Polski", NationId = 20 },
            new { Id = 2170, Name = "Decathlon AG2R La Mondiale Development Team", NationId = 3 },
            new { Id = 2171, Name = "Movistar - Best PC", NationId = 27 },
            new { Id = 2172, Name = "Team Banco Guayaquil - Ecuador", NationId = 27 },
            new { Id = 2173, Name = "Team Skyline", NationId = 9 },
            new { Id = 2174, Name = "ATT Investments", NationId = 25 }
        ];
    }
}