using Microsoft.EntityFrameworkCore;
using Prestigelisten.Integrations.GoogleSheets;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;
using Prestigelisten.Integrations.GoogleSheets.Abstractions.Services;
using Prestigelisten.Persistence;

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
var ridersService = scope.ServiceProvider.GetRequiredService<IRidersService>();
var nationsService = scope.ServiceProvider.GetRequiredService<INationsService>();
var resultsService = scope.ServiceProvider.GetRequiredService<IResultsService>();
var connector = scope.ServiceProvider.GetRequiredService<IConnector>();

var riders = ridersService.GetAllRiders();
var nations = nationsService.GetAllNations();
var results = resultsService.GetAllResults();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
