using Microsoft.EntityFrameworkCore;
using Prestigelisten.Api.Endpoints;
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

var api = app.MapGroup("/api/v1");

api.MapResultEndpoints();

app.Run();
