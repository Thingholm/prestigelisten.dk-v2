using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;
using Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;
using Prestigelisten.Integrations.GoogleSheets.Models;
using Prestigelisten.Integrations.GoogleSheets.Services;

namespace Prestigelisten.Integrations.GoogleSheets;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGoogleSheetsIntegration(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.Configure<GoogleSheetsOptions>(
            configuration.GetSection(GoogleSheetsOptions.SectionName)
        );

        services.AddScoped<IConnector, Connector>();
        services.AddScoped<IRidersService, RidersService>();
        services.AddScoped<INationsService, NationsService>();

        return services;
    }
}
