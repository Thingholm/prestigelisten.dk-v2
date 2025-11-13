using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Application.Services;

namespace Prestigelisten.Application;

public static class Extensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IRiderService, RiderService>();
        services.AddScoped<IResultService, ResultService>();

        return services;
    }
}
