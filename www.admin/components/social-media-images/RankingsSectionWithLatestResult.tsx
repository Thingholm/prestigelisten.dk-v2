import { RankingEvolution } from "@/app/dashboard/some-images/[id]/page";
import { Settings } from "./ContentWrapper";
import { Rider } from "@/lib/db/riders";
import { rankBy } from "@/lib/helpers/rank";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import RankDisplay from "./RankDisplay";
import { useT } from "@/lib/helpers/translations";


export default function RankingsSectionWithLatestResult({
    rankingEvolution,
    rider,
    settings,
    locale
}: Readonly<{
    rankingEvolution: RankingEvolution,
    rider: Rider,
    settings: Settings,
    locale: "en" | "da"
}>) {
    const t = useT("twitterCard", locale);
    const tResultNames = useT("getResultNames", locale);
    const tNations = useT("nations", locale);

    const alltimeRank = rankingEvolution.rankings.find(r => r.id == rider.id)?.rank;
    const oldAlltimeRank = rankingEvolution.prevRankings?.find(r => r.id == rider.id)?.rank;
    const activeRank = rankBy(rankingEvolution.rankings.filter(r => r.active), "points").find(r => r.id == rider.id)?.rank;
    const oldActiveRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.active), "points").find(r => r.id == rider.id)?.rank;
    const nationRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.rankings.filter(r => r.nation_id == rider.nation_id), "points").find(r => r.id == rider.id)?.rank;
    const oldNationRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.nation_id == rider.nation_id), "points").find(r => r.id == rider.id)?.rank;
    const yearRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.rankings.filter(r => r.year == rider.year), "points").find(r => r.id == rider.id)?.rank;
    const oldYearRank = rankingEvolution.prevRankings && rankBy(rankingEvolution.prevRankings.filter(r => r.year == rider.year), "points").find(r => r.id == rider.id)?.rank;
    
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
                <p className="text-nowrap pl-2 lowercase">{latestResultGroup?.points} {t("points")}</p>
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