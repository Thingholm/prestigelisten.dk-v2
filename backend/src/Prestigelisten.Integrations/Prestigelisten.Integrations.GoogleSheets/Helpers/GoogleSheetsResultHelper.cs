using System.Text.RegularExpressions;
using Prestigelisten.Core.Enums;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Integrations.GoogleSheets.Helpers;

public static class GoogleSheetsResultHelper
{
    public static (
        string raceName,
        ResultType resultType,
        int? placement,
        int? stage
    ) ParseResultString(string resultString)
    {
        var raceName = ExtractRaceName(resultString);

        // TODO: Change sheet and remove this hardcoding
        if (raceName.Equals("Volta a Catalunya (1982-1996)", StringComparison.OrdinalIgnoreCase))
        {
            raceName = "Volta Ciclista a Catalunya (1982-1996)";
        }

        if (
            raceName.Equals(
                "Roma-Napoli-Roma  (<1908 + 1912 + 1914 + 1920-1926)",
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            raceName = "Roma-Napoli-Roma (<1908 + 1912 + 1914 + 1920-1926)";
        }

        // Hardcoded for result strings not matching any race name
        switch (resultString)
        {
            case "Verdensmester i enkeltstart":
                return ("VM i enkeltstart", ResultType.Gold, null, null);
            case "VM-sølv i enkeltstart":
                return ("VM i enkeltstart", ResultType.Silver, null, null);
            case "VM-bronze i enkeltstart":
                return ("VM i enkeltstart", ResultType.Bronze, null, null);
            case "Verdensmester":
                return ("VM i linjeløb", ResultType.Gold, null, null);
            case "VM-sølv":
                return ("VM i linjeløb", ResultType.Silver, null, null);
            case "VM-bronze":
                return ("VM i linjeløb", ResultType.Bronze, null, null);
            case "4. plads ved VM":
                return ("VM i linjeløb", ResultType.Top5, 4, null);
            case "5. plads ved VM":
                return ("VM i linjeløb", ResultType.Top5, 5, null);
            case "Olympisk mester i enkeltstart (>1994)":
                return ("OL i enkeltstart (>1994)", ResultType.Gold, null, null);
            case "OL-sølv i enkeltstart (>1994)":
                return ("OL i enkeltstart (>1994)", ResultType.Silver, null, null);
            case "OL-bronze i enkeltstart (>1994)":
                return ("OL i enkeltstart (>1994)", ResultType.Bronze, null, null);
            case "Olympisk mester i enkeltstart (<1994)":
                return ("OL i enkeltstart (<1994)", ResultType.Gold, null, null);
            case "OL-sølv i enkeltstart (<1994)":
                return ("OL i enkeltstart (<1994)", ResultType.Silver, null, null);
            case "OL-bronze i enkeltstart (<1994)":
                return ("OL i enkeltstart (<1994)", ResultType.Bronze, null, null);
            case "Olympisk mester (>1994)":
                return ("OL i linjeløb (>1994)", ResultType.Gold, null, null);
            case "OL-sølv (>1994)":
                return ("OL i linjeløb (>1994)", ResultType.Silver, null, null);
            case "OL-bronze (>1994)":
                return ("OL i linjeløb (>1994)", ResultType.Bronze, null, null);
            case "Olympisk mester (<1994)":
                return ("OL i linjeløb (<1994)", ResultType.Gold, null, null);
            case "OL-sølv (<1994)":
                return ("OL i linjeløb (<1994)", ResultType.Silver, null, null);
            case "OL-bronze (<1994)":
                return ("OL i linjeløb (<1994)", ResultType.Bronze, null, null);
            case "Europamester i enkeltstart":
                return ("EM i enkeltstart", ResultType.Gold, null, null);
            case "EM-sølv i enkeltstart":
                return ("EM i enkeltstart", ResultType.Silver, null, null);
            case "EM-bronze i enkeltstart":
                return ("EM i enkeltstart", ResultType.Bronze, null, null);
            case "Europamester":
                return ("EM i linjeløb", ResultType.Gold, null, null);
            case "EM-sølv":
                return ("EM i linjeløb", ResultType.Silver, null, null);
            case "EM-bronze":
                return ("EM i linjeløb", ResultType.Bronze, null, null);
            case "OL 12 timers løb - guld":
                return ("OL 12 timers løb", ResultType.Gold, null, null);
            case "OL 12 timers løb - sølv":
                return ("OL 12 timers løb", ResultType.Silver, null, null);
            case "VM (amatør) - guld":
                return ("VM (amatør)", ResultType.Gold, null, null);
            case "VM (amatør) - sølv":
                return ("VM (amatør)", ResultType.Silver, null, null);
            case "VM (amatør) - bronze":
                return ("VM (amatør)", ResultType.Bronze, null, null);
            default:
                break;
        }

        // Stage win
        var stageMatch = Regex.Match(resultString, @"^(\d+)\. etape af", RegexOptions.IgnoreCase);
        if (stageMatch.Success)
            return (raceName, ResultType.StageWin, null, int.Parse(stageMatch.Groups[1].Value));

        // Placement
        var placementMatch = Regex.Match(
            resultString,
            @"^(\d+)\. plads (i|ved)",
            RegexOptions.IgnoreCase
        );
        if (placementMatch.Success)
        {
            var placement = int.Parse(placementMatch.Groups[1].Value);
            if (placement <= 3)
                return (raceName, ResultType.Top3, placement, null);
            if (placement <= 5)
                return (raceName, ResultType.Top5, placement, null);
            if (placement <= 10)
                return (raceName, ResultType.Top10, placement, null);
        }

        // Mountains jersey
        if (resultString.StartsWith("Bjergtrøje", StringComparison.OrdinalIgnoreCase))
            return (raceName, ResultType.MountainsJersey, null, null);

        // Points jersey
        if (resultString.StartsWith("Pointtrøje", StringComparison.OrdinalIgnoreCase))
            return (raceName, ResultType.PointsJersey, null, null);

        // Leaders jersey
        if (Regex.IsMatch(resultString, @"1\. dag i førertrøjen i", RegexOptions.IgnoreCase))
            return (raceName, ResultType.FirstDayInLeadersJersey, null, null);

        if (Regex.IsMatch(resultString, @"2\. dag i førertrøjen i", RegexOptions.IgnoreCase))
            return (raceName, ResultType.SecondDayInLeadersJersey, null, null);

        if (Regex.IsMatch(resultString, @"3\. dag i førertrøjen i", RegexOptions.IgnoreCase))
            return (raceName, ResultType.ThirdDayInLeadersJersey, null, null);

        if (Regex.IsMatch(resultString, @"Øvrige dage i førertrøjen i", RegexOptions.IgnoreCase))
            return (raceName, ResultType.OtherDayInLeadersJersey, null, null);

        return (raceName, ResultType.Win, null, null);
    }

    public static string ExtractRaceName(string resultString)
    {
        if (resultString.Contains("mester"))
        {
            return resultString.Trim();
        }

        var separatorIndex = resultString.LastIndexOf(" i ");
        if (separatorIndex == -1)
        {
            separatorIndex = resultString.LastIndexOf(" ved ");
        }
        if (separatorIndex == -1)
        {
            separatorIndex = resultString.LastIndexOf(" af ");
        }

        return separatorIndex == -1
            ? resultString.Trim()
            : resultString[(separatorIndex + 3)..].Trim();
    }
}
