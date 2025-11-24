using AutoFixture;
using FluentAssertions;
using Prestigelisten.Core.Interfaces.Services;
using Prestigelisten.Core.Models;
using Prestigelisten.Core.Services;

namespace Prestigelisten.Tests.Core;

public class SeasonComputationServiceTests
{
    private readonly ISeasonComputationService _sut;
    private readonly Fixture _fixture;

    public SeasonComputationServiceTests()
    {
        _sut = new SeasonComputationService();
        _fixture = new Fixture();
        _fixture.Behaviors
            .OfType<ThrowingRecursionBehavior>()
            .ToList()
            .ForEach(b => _fixture.Behaviors.Remove(b));

        _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
    }

    [Fact]
    public void ProcessSeasons_WithValidRiderData_AccumulatesPointsAndRanks()
    {
        // Arrange
        var rider1 = _fixture.Build<Rider>()
            .Without(r => r.Seasons)
            .Without(r => r.PreviousNationalities)
            .Create();

        rider1.Seasons =
        [
            new RiderSeason
            {
                Rider = rider1,
                Year = 2024,
                PointsForYear = 100,
            },
            new RiderSeason
            {
                Rider = rider1,
                Year = 2025,
                PointsForYear = 150,
            }
        ];

        var rider2 = _fixture.Build<Rider>()
            .Without(r => r.Seasons)
            .Without(r => r.PreviousNationalities)
            .Create();

        rider2.Seasons =
        [
            new RiderSeason
            {
                Rider = rider2,
                Year = 2024,
                PointsForYear = 200,
            },
            new RiderSeason
            {
                Rider = rider2,
                Year = 2025,
                PointsForYear = 50,
            }
        ];

        var riders = new List<Rider> { rider1, rider2 };
        var seasons = rider1.Seasons.Concat(rider2.Seasons).ToList();

        // Act
        _sut.ProcessSeasons(
            riders, 
            seasons,
            season => season.Rider,
            (rider, year) => new RiderSeason
            {
                Rider = rider,
                Year = year,
            }
        );

        // Assert
        var rider1Season2024 = seasons.First(s => s.Rider.Id == rider1.Id && s.Year == 2024);
        var rider2Season2024 = seasons.First(s => s.Rider.Id == rider2.Id && s.Year == 2024);

        rider1Season2024.PointsAllTime.Should().Be(100);
        rider1Season2024.RankAllTime.Should().Be(2);
        rider1Season2024.RankForYear.Should().Be(2);
        rider2Season2024.PointsAllTime.Should().Be(200);
        rider2Season2024.RankAllTime.Should().Be(1);
        rider2Season2024.RankForYear.Should().Be(1);

        var rider1Season2025 = seasons.First(s => s.Rider.Id == rider1.Id && s.Year == 2025);
        var rider2Season2025 = seasons.First(s => s.Rider.Id == rider2.Id && s.Year == 2025);

        rider1Season2025.PointsAllTime.Should().Be(250);
        rider1Season2025.RankAllTime.Should().Be(1);
        rider1Season2025.RankForYear.Should().Be(1);
        rider2Season2025.PointsAllTime.Should().Be(250);
        rider2Season2025.RankAllTime.Should().Be(1);
        rider2Season2025.RankForYear.Should().Be(2);
    }

    [Fact]
    public void ProcessSeasons_WithValidNationDataAndMissingSeasons_AccumulatesPointsAndRanks()
    {
        // Arrange
        var nation1 = _fixture.Build<Nation>()
            .Without(r => r.Seasons)
            .Create();

        nation1.Seasons =
        [
            new NationSeason
            {
                Nation = nation1,
                Year = 2022,
                PointsForYear = 200,
            },
            new NationSeason
            {
                Nation = nation1,
                Year = 2025,
                PointsForYear = 150,
            }
        ];

        var nation2 = _fixture.Build<Nation>()
            .Without(r => r.Seasons)
            .Create();

        nation2.Seasons =
        [
            new NationSeason
            {
                Nation = nation2,
                Year = 2023,
                PointsForYear = 100,
            },
            new NationSeason
            {
                Nation = nation2,
                Year = 2024,
                PointsForYear = 150,
            }
        ];

        var nations = new List<Nation> { nation1, nation2 };
        var seasons = nation1.Seasons.Concat(nation2.Seasons).ToList();

        // Act
        _sut.ProcessSeasons(
            nations,
            seasons,
            season => season.Nation,
            (nation, year) => new NationSeason
            {
                Nation = nation,
                Year = year,
            }
        );

        // Assert
        var nation1Season2022 = seasons.First(s => s.Nation.Id == nation1.Id && s.Year == 2022);

        nation1Season2022.PointsAllTime.Should().Be(200);
        nation1Season2022.RankAllTime.Should().Be(1);
        nation1Season2022.RankForYear.Should().Be(1);

        var nation1Season2023 = seasons.First(s => s.Nation.Id == nation1.Id && s.Year == 2023);
        var nation2Season2023 = seasons.First(s => s.Nation.Id == nation2.Id && s.Year == 2023);

        nation1Season2023.PointsAllTime.Should().Be(200);
        nation1Season2023.RankAllTime.Should().Be(1);
        nation1Season2023.RankForYear.Should().BeNull();
        nation2Season2023.PointsAllTime.Should().Be(100);
        nation2Season2023.RankAllTime.Should().Be(2);
        nation2Season2023.RankForYear.Should().Be(1);

        var nation1Season2024 = seasons.First(s => s.Nation.Id == nation1.Id && s.Year == 2024);
        var nation2Season2024 = seasons.First(s => s.Nation.Id == nation2.Id && s.Year == 2024);

        nation1Season2024.PointsAllTime.Should().Be(200);
        nation1Season2024.RankAllTime.Should().Be(2);
        nation1Season2024.RankForYear.Should().BeNull();
        nation2Season2024.PointsAllTime.Should().Be(250);
        nation2Season2024.RankAllTime.Should().Be(1);
        nation2Season2024.RankForYear.Should().Be(1);

        var nation1Season2025 = seasons.First(s => s.Nation.Id == nation1.Id && s.Year == 2025);
        var nation2Season2025 = seasons.First(s => s.Nation.Id == nation2.Id && s.Year == 2025);

        nation1Season2025.PointsAllTime.Should().Be(350);
        nation1Season2025.RankAllTime.Should().Be(1);
        nation1Season2025.RankForYear.Should().Be(1);
        nation2Season2025.PointsAllTime.Should().Be(250);
        nation2Season2025.RankAllTime.Should().Be(2);
        nation2Season2025.RankForYear.Should().BeNull();
    }

    [Fact]
    public void RecalculateSeasonPoints_WithPreviousSeason_ReturnsCorrectPoints()
    {
        var nation = _fixture.Build<Nation>()
            .Without(r => r.Seasons)
            .Create();

        var previousSeasons = new Dictionary<int, NationSeason>
        {
            [nation.Id] = new NationSeason
            {
                Nation = nation,
                Year = 2024,
                PointsForYear = 200,
                PointsAllTime = 200,
            }
        };

        var seasons = new List<NationSeason>
        {
            new NationSeason
            {
                Nation = nation,
                Year = 2025,
                PointsForYear = 50,
                PointsAllTime = 5000,
            }
        };

        // Act
        _sut.RecalculateSeasonPoints(
            seasons, 
            previousSeasons, 
            season => season.Nation
        );

        // Assert
        seasons[0].PointsAllTime.Should().Be(250);
    }

    [Fact]
    public void RecalculateSeasonPoints_WithoutPreviousSeason_ReturnsCorrectPoints()
    {
        var rider = _fixture.Build<Rider>()
            .Without(r => r.Seasons)
            .Create();

        var previousSeasons = new Dictionary<int, RiderSeason> { };

        var seasons = new List<RiderSeason>
        {
            new RiderSeason
            {
                Rider = rider,
                Year = 2025,
                PointsForYear = 50,
                PointsAllTime = 5000,
            }
        };

        // Act
        _sut.RecalculateSeasonPoints(
            seasons,
            previousSeasons,
            season => season.Rider
        );

        // Assert
        seasons[0].PointsAllTime.Should().Be(50);
    }
}
