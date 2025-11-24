using AutoFixture;
using FluentAssertions;
using Prestigelisten.Core.Helpers;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Tests.Core;

public class RankCalculationHelperTests
{
    private readonly Fixture _fixture;

    public RankCalculationHelperTests()
    {
        _fixture = new Fixture();
    }

    [Fact]
    public void CalculateRanks_WithDifferentPoints_AssignsCorrectRanks()
    {
        // Arrange
        var pointsTable = new List<TestRankingItem>
        {
            new TestRankingItem { Points = 200 },
            new TestRankingItem { Points = 300 },
            new TestRankingItem { Points = 100 },
        };

        // Act
        var result = RankCalculationHelper.CalculateRanks(
            pointsTable,
            item => item.Points,
            (item, rank) => item.Rank = rank
        );

        result.Should().HaveCount(3);
        result[0].Points.Should().Be(300);
        result[0].Rank.Should().Be(1);
        result[1].Points.Should().Be(200);
        result[1].Rank.Should().Be(2);
        result[2].Points.Should().Be(100);
        result[2].Rank.Should().Be(3);
    }

    [Fact]
    public void CalculateRanks_WithTiedPoints_AssignsCorrectRanks()
    {
        // Arrange
        var pointsTable = new List<TestRankingItem>
        {
            new TestRankingItem { Points = 200 },
            new TestRankingItem { Points = 300 },
            new TestRankingItem { Points = 200 },
            new TestRankingItem { Points = 100 },
        };

        // Act
        var result = RankCalculationHelper.CalculateRanks(
            pointsTable,
            item => item.Points,
            (item, rank) => item.Rank = rank
        );

        result.Should().HaveCount(4);
        result[0].Points.Should().Be(300);
        result[0].Rank.Should().Be(1);
        result[1].Points.Should().Be(200);
        result[1].Rank.Should().Be(2);
        result[2].Points.Should().Be(200);
        result[2].Rank.Should().Be(2);
        result[3].Points.Should().Be(100);
        result[3].Rank.Should().Be(4);
    }
}

public class TestRankingItem
{
    public int Points { get; set; }
    public int Rank { get; set; }
}
