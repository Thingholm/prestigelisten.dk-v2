# Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY *.slnx .
COPY ["src/Prestigelisten.Api/Prestigelisten.Api.csproj", "src/Prestigelisten.Api/"]
COPY ["src/Prestigelisten.Application/Prestigelisten.Application.csproj", "src/Prestigelisten.Application/"]
COPY ["src/Prestigelisten.Core/Prestigelisten.Core.csproj", "src/Prestigelisten.Core/"]
COPY ["src/Prestigelisten.Persistence/Prestigelisten.Persistence.csproj", "src/Prestigelisten.Persistence/"]
COPY ["src/Prestigelisten.Integrations/Prestigelisten.Integrations.GoogleSheets.Abstractions/Prestigelisten.Integrations.GoogleSheets.Abstractions.csproj", "src/Prestigelisten.Integrations/Prestigelisten.Integrations.GoogleSheets.Abstractions/"]
COPY ["src/Prestigelisten.Integrations/Prestigelisten.Integrations.GoogleSheets/Prestigelisten.Integrations.GoogleSheets.csproj", "src/Prestigelisten.Integrations/Prestigelisten.Integrations.GoogleSheets/"]

RUN dotnet restore "src/Prestigelisten.Api/Prestigelisten.Api.csproj"

COPY . .

WORKDIR /app/src/Prestigelisten.Api
RUN dotnet build "Prestigelisten.Api.csproj" -c Release --no-restore

# Publish
FROM build AS publish
RUN dotnet publish "Prestigelisten.Api.csproj" -c Release --no-restore -o /app/publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=publish /app/publish .

RUN mkdir -p /root/.microsoft/usersecrets

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "Prestigelisten.Api.dll"]