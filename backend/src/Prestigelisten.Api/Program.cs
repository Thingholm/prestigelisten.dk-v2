using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Prestigelisten.Api.Endpoints;
using Prestigelisten.Application;
using Prestigelisten.Core;
using Prestigelisten.Integrations.GoogleSheets;
using Prestigelisten.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContextFactory<AppDbContext>(options =>
    options
        .UseNpgsql(
            builder.Configuration.GetConnectionString("DefaultConnection"), 
            npgsqlOptions =>
            {
                npgsqlOptions.EnableRetryOnFailure(3);
            }
        )
        .UseSnakeCaseNamingConvention()
);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddGoogleSheetsIntegration(builder.Configuration);
builder.Services.AddDbExtensions(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddCoreServices();

builder.Services.AddAuthorization();

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = JsonWebKey.Create(builder.Configuration["Authentication:JwtPublicJwk"]!),
        ValidIssuer = builder.Configuration["Authentication:ValidIssuer"],
        ValidAudience = builder.Configuration["Authentication:ValidAudience"],
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration["Cors:AllowedOrigins"]!)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

var api = app.MapGroup("/api/v1");

api.MapGet("/health", () => Results.Ok("Healthy"));

api.MapResultEndpoints();

app.Run();
