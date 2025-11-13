using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Core.Repositories;
using Prestigelisten.Persistence.Repositories;

namespace Prestigelisten.Persistence;

public static class Extensions
{
    public static IServiceCollection AddDbExtensions(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        // Options
        services.Configure<DbOptions>(configuration.GetSection(DbOptions.SectionName));

        // Repositories
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IRiderRepository, RiderRepository>();
        services.AddScoped<IRaceRepository, RaceRepository>();
        services.AddScoped<IResultRepository, ResultRepository>();
        services.AddScoped<IPointSystemRepository, PointSystemRepository>();

        return services;
    }
}
