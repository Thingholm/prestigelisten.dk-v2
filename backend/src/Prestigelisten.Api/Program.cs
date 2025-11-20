using Microsoft.EntityFrameworkCore;
using Prestigelisten.Application;
using Prestigelisten.Application.Interfaces.Services;
using Prestigelisten.Core;
using Prestigelisten.Integrations.GoogleSheets;
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
builder.Services.AddDbExtensions(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddCoreServices();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var riderService = scope.ServiceProvider.GetRequiredService<IRiderService>();
var resultService = scope.ServiceProvider.GetRequiredService<IResultService>();
var seasonService = scope.ServiceProvider.GetRequiredService<ISeasonService>();

var updates = await resultService.SyncAllResults();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
