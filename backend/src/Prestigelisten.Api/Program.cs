using Microsoft.EntityFrameworkCore;
using Prestigelisten.Persistence;
using Prestigelisten.Integrations.GoogleSheets;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options
        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
        .UseSnakeCaseNamingConvention()
);

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddGoogleSheetsIntegration(builder.Configuration);

var app = builder.Build();

using var scope = app.Services.CreateScope();
var connector = scope.ServiceProvider.GetRequiredService<IConnector>();

var isConnected = await connector.TestConnectionAsync();
Console.WriteLine($"Connection test: {(isConnected ? "Success" : "Failed")}");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.Run();