import { Rider } from "@/db/rider";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Settings } from "./ContentWrapper";
import { RankingEvolution } from "@/lib/helpers/rankingEvolution";
import { useTranslations } from "next-intl";
import { rankBy } from "@/lib/helpers/rank";
import RankDisplay from "../_components/RankDisplay";
import { getGroupedResultName } from "@/lib/helpers/resultNames";

export default function RankingsSectionWithLatestResult({
    rankingEvolution,
    rider,
    settings,
}: Readonly<{
    rankingEvolution: RankingEvolution,
    rider: Rider,
    settings: Settings
}>) {
    const t = useTranslations("twitterCard");
    const tResultNames = useTranslations("getResultNames");
    const tNations = useTranslations("nations")

    const alltimeRank = rankingEvolution.rankings.find(r => r.rider_id == rider.id)?.rank;
    const oldAlltimeRank = rankingEvolution.prevRankings?.find(r => r.rider_id == rider.id)?.rank;
    const activeRank = rankBy(rankingEvolution.rankings.filter(r => r.riders.active), "points").find(r => r.rider_id == rider.id)?.rank;
    const oldActiveRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.riders.active), "points").find(r => r.rider_id == rider.id)?.rank;
    const nationRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.rankings.filter(r => r.riders.nation_id == rider.nation_id), "points").find(r => r.rider_id == rider.id)?.rank;
    const oldNationRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.riders.nation_id == rider.nation_id), "points").find(r => r.rider_id == rider.id)?.rank;
    const yearRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.rankings.filter(r => r.riders.year == rider.year), "points").find(r => r.rider_id == rider.id)?.rank;
    const oldYearRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.riders.year == rider.year), "points").find(r => r.rider_id == rider.id)?.rank;
    
    const latestResultGroup = rankingEvolution.results.find(r => r.key == rider.id);

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-pretty">
                    {latestResultGroup?.results
                        .sort((a, b) => b.points - a.points)
                        .map((result, resultIndex) => (
                            <span key={resultIndex}>
                                {resultIndex > 0  
                                    ? (resultIndex == latestResultGroup.results.length - 1
                                        ? ` ${t("and")} `
                                        : ", ")
                                    : ""
                                }
                                <span>{getGroupedResultName(result, tResultNames, true)}</span>
                            </span>
                        ))
                    }
                </p>
                <p className="text-nowrap pl-2">{latestResultGroup?.points} {t("points")}</p>
            </div>
            <div className="flex justify-between gap-2 mt-2">
                {settings.showAllTimeRanking && alltimeRank && 
                    <RankDisplay 
                        rank={alltimeRank}
                        oldRank={oldAlltimeRank}
                        title={t("allTime")}
                    />
                }
                {settings.showActiveRanking && activeRank && 
                    <RankDisplay 
                        rank={activeRank} 
                        oldRank={oldActiveRank}
                        title={t("active")}
                    />
                }
                {settings.showNationsRanking && nationRank && 
                    <RankDisplay 
                        rank={nationRank}
                        oldRank={oldNationRank}
                        title={tNations(`${rider.nations.code}.name`)}
                    />
                }
                {settings.showBirthYearRanking && yearRank && rider.year && 
                    <RankDisplay 
                        rank={yearRank} 
                        oldRank={oldYearRank}
                        title={t("fromYear", { year: rider.year })}
                    />
                }
            </div>
        </div>
    )
}