using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Core.Interfaces.Services;
using Prestigelisten.Core.Services;

namespace Prestigelisten.Core;

public static class Extensions
{
    public static IServiceCollection AddCoreServices(this IServiceCollection services)
    {
        services.AddScoped<ISeasonComputationService, SeasonComputationService>();

        return services;
    }
}
