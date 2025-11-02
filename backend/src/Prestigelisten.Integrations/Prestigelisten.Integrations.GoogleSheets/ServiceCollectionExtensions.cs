using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;
using Prestigelisten.Integrations.GoogleSheets.Models;

namespace Prestigelisten.Integrations.GoogleSheets;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGoogleSheetsIntegration(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GoogleSheetsOptions>(
            configuration.GetSection(GoogleSheetsOptions.SectionName));

        services.AddScoped<IConnector, Connector>();

        return services;
    }
}
