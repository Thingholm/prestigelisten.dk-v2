using FluentAssertions;
using Prestigelisten.Core.Enums;
using Prestigelisten.Integrations.GoogleSheets.Helpers;

namespace Prestigelisten.Tests.Integrations.GoogleSheets;

public class GoogleSheetsResultHelperTests
{
    [Theory]
    [InlineData("1. etape af Giro d'Italia", "Giro d'Italia", 1)]
    [InlineData("21. etape af Tour de France", "Tour de France", 21)]
    public void ParseResultString_StageWinResults_ReturnsCorrectValues(
        string resultString,
        string expectedRaceName,
        int expectedStage
    )
    {
        // Arrange

        // Act 
        var result = GoogleSheetsResultHelper.ParseResultString(resultString);

        // Assert
        AssertResult(result, expectedRaceName, ResultType.StageWin, null, expectedStage);
    }

    [Theory]
    [InlineData("Paris-Roubaix", "Paris-Roubaix", ResultType.Win, null)]
    [InlineData("2. plads i Ronde van Vlaanderen", "Ronde van Vlaanderen", ResultType.Top3, 2)]
    [InlineData("3. plads i Criterium du Dauphine", "Criterium du Dauphine", ResultType.Top3, 3)]
    [InlineData("4. plads i Bordueax-Paris (<1946)", "Bordueax-Paris (<1946)", ResultType.Top5, 4)]
    [InlineData("5. plads i Milano-Sanremo", "Milano-Sanremo", ResultType.Top5, 5)]
    [InlineData("6. plads i Tour de France", "Tour de France", ResultType.Top10, 6)]
    [InlineData("7. plads i Tour de France", "Tour de France", ResultType.Top10, 7)]
    [InlineData("8. plads i Tour de France", "Tour de France", ResultType.Top10, 8)]
    [InlineData("9. plads i Tour de France", "Tour de France", ResultType.Top10, 9)]
    [InlineData("10. plads i Tour de France", "Tour de France", ResultType.Top10, 10)]
    public void ParseResultString_PlacementResults_ReturnsCorrectValues(
        string resultString,
        string expectedRaceName,
        ResultType expectedResultType,
        int? expectedPlacement
    )
    {
        // Arrange

        // Act
        var result = GoogleSheetsResultHelper.ParseResultString(resultString);

        // Assert
        AssertResult(result, expectedRaceName, expectedResultType, expectedPlacement);
    }

    [Theory]
    [InlineData("Bjergtrøjen i Giro d'Italia", "Giro d'Italia")]
    [InlineData("Bjergtrøje i Tour de France", "Tour de France")]
    [InlineData("Bjergtrøje i Vuelta a España (1979-1994)", "Vuelta a España (1979-1994)")]
    public void ParseResultString_MountainJerseyResults_ReturnsCorrectValues(
        string resultString,
        string expectedRaceName
    )
    {
        // Arrange

        // Act
        var result = GoogleSheetsResultHelper.ParseResultString(resultString);

        // Assert
        AssertResult(result, expectedRaceName, ResultType.MountainsJersey);
    }

    [Theory]
    [InlineData("Pointtrøjen i Giro d'Italia", "Giro d'Italia")]
    [InlineData("Pointtrøje i Tour de France", "Tour de France")]
    [InlineData("Pointtrøje i Vuelta a España (1979-1994)", "Vuelta a España (1979-1994)")]
    public void ParseResultString_PointsJerseyResults_ReturnsCorrectValues(
        string resultString,
        string expectedRaceName
    )
    {
        // Arrange

        // Act
        var result = GoogleSheetsResultHelper.ParseResultString(resultString);

        // Assert
        AssertResult(result, expectedRaceName, ResultType.PointsJersey);
    }

    [Theory]
    [InlineData("1. dag i førertrøjen i Tour de France", "Tour de France", ResultType.FirstDayInLeadersJersey)]
    [InlineData("2. dag i førertrøjen i Tour de France", "Tour de France", ResultType.SecondDayInLeadersJersey)]
    [InlineData("3. dag i førertrøjen i Tour de France", "Tour de France", ResultType.ThirdDayInLeadersJersey)]
    [InlineData("Øvrige dage i førertrøjen i Tour de France", "Tour de France", ResultType.OtherDayInLeadersJersey)]
    public void ParseResultString_LeadersJerseyResults_ReturnsCorrectValues(
        string resultString,
        string expectedRaceName,
        ResultType expectedResultType
    )
    {
        // Arrange

        // Act
        var result = GoogleSheetsResultHelper.ParseResultString(resultString);

        // Assert
        AssertResult(result, expectedRaceName, expectedResultType);
    }

    private static void AssertResult(
        (string raceName, ResultType resultType, int? placement, int? stage) result,
        string expectedRaceName,
        ResultType expectedType,
        int? expectedPlacement = null,
        int? expectedStage = null
    )
    {
        result.raceName.Should().Be(expectedRaceName);
        result.resultType.Should().Be(expectedType);
        result.placement.Should().Be(expectedPlacement);
        result.stage.Should().Be(expectedStage);
    }
}
