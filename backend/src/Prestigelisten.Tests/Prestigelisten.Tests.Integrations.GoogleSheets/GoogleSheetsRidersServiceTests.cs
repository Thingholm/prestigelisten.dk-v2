using AutoFixture;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NSubstitute;
using Prestigelisten.Core.Models;
using Prestigelisten.Integrations.GoogleSheets.Abstractions;
using Prestigelisten.Integrations.GoogleSheets.Models;
using Prestigelisten.Integrations.GoogleSheets.Services;

namespace Prestigelisten.Tests.Integrations.GoogleSheets;

public class GoogleSheetsRidersServiceTests
{
    private readonly IConnector _connector;
    private readonly ILogger<GoogleSheetsRidersService> _logger;
    private readonly IOptions<GoogleSheetsOptions> _options;
    private readonly GoogleSheetsRidersService _sut;

    public GoogleSheetsRidersServiceTests()
    {
        _connector = Substitute.For<IConnector>();
        _logger = Substitute.For<ILogger<GoogleSheetsRidersService>>();

        var fixture = new Fixture();
        var googleSheetsOptions = fixture.Build<GoogleSheetsOptions>()
            .With(options => options.RidersAllTimeSheet, new RidersAllTimeSheetDetails
            {
                ColumnIndexes = new RidersAllTimeColumnIndexes
                {
                    Name = 1,
                    Nation = 3,
                    Year = 4
                },
                Range = string.Empty
            })
            .With(options => options.RidersActiveSheet, new RidersActiveSheetDetails
            {
                ColumnIndexes = new RidersActiveColumnIndexes
                {
                    Name = 2,
                    Nation = 4,
                    Team = 5,
                    Year = 6
                },
                Range = string.Empty
            })
            .Create();

        _options = Options.Create(googleSheetsOptions);

        _sut = new GoogleSheetsRidersService(_connector, _logger, _options);
    }

    [Fact]
    public void GetAllRiders_WithValidData_ReturnsCorrectMergedRiders()
    {
        // Arrange
        var alltimeRidersList = new List<List<string>>
        {
            new List<string> { "Placering", "Rytter", "Point", "Nation", "Årgang"},
            new List<string> { "1", "Eddy Merckx", "3995", "Belgien", "1945"},
            new List<string> { "2", "Tadej Pogacar", "2315", "Slovenien", "1998"},
            new List<string> { "3", "Frederick Goodwin", "50", "Storbritannien", "-"},
        };

        var activeRidersList = new List<List<string>>
        {
            new List<string> { "Placering", "Alltime", "Rytter", "Point", "Nation", "Hold", "Årgang"},
            new List<string> { "1", "2", "TADEJ POGACAR", "2315", "Slovenien", "UAE Team Emirates - XRG", "1998"},
        };

        _connector.GetRidersAllTimeSheetValues().Returns(alltimeRidersList);
        _connector.GetRidersActiveSheetValues().Returns(activeRidersList);

        // Act
        var result = _sut.GetAllRiders();

        // Assert
        result.Should().HaveCount(3);

        var eddyMerckx = result.First(r => r.Name == "Eddy Merckx");
        eddyMerckx.Nation.Should().Be("Belgien");
        eddyMerckx.Year.Should().Be(1945);
        eddyMerckx.Team.Should().BeNull();
        eddyMerckx.IsActive.Should().BeFalse();

        var tadejPogacar = result.First(r => r.Name == "Tadej Pogacar");
        tadejPogacar.Nation.Should().Be("Slovenien");
        tadejPogacar.Year.Should().Be(1998);
        tadejPogacar.Team.Should().Be("UAE Team Emirates - XRG");
        tadejPogacar.IsActive.Should().BeTrue();

        var frederickGoodwin = result.First(r => r.Name == "Frederick Goodwin");
        frederickGoodwin.Nation.Should().Be("Storbritannien");
        frederickGoodwin.Year.Should().BeNull();
        frederickGoodwin.Team.Should().BeNull();
        frederickGoodwin.IsActive.Should().BeFalse();
    }
}
