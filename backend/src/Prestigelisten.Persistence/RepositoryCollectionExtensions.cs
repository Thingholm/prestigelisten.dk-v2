using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Core.Repositories;
using Prestigelisten.Persistence.Repositories;

namespace Prestigelisten.Persistence;

public static class RepositoryCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

        services.AddScoped<IRiderRepository, RiderRepository>();

        return services;
    }
}
