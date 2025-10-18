import { Rider } from "@/db/rider";
import { Settings } from "./ContentWrapper";
import { RankingEvolution } from "@/lib/helpers/rankingEvolution";
import Profile from "./Profile";
import RankingsSectionGeneral from "./RankingsSectionGeneral";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import RankingsSectionWithLatestResult from "./RankingsSectionWithLatestResult";
import RankingsTableSection from "./RankingsTableSection";
import { rankBy } from "@/lib/helpers/rank";
import { PointSystem } from "@/db/pointSystem";
import GroupedResults from "./GroupedResults";

export default function TwitterCard({
    rankingEvolutions,
    rider,
    settings,
    ref,
    riderPoints,
    pointSystem
}: Readonly<{
    rankingEvolutions:  RankingEvolution[] | null,
    rider: Rider,
    settings: Settings,
    ref: React.RefObject<HTMLDivElement>,
    riderPoints: RiderPointsWithNationAndTeam,
    pointSystem: PointSystem
}>) {
    const rankingEvolution = rankingEvolutions?.find(e => e.results.some(r => r.key == rider.id));

    return (
        <div className="h-[400px] w-[765px] flex" ref={ref}>
            <Profile rider={rider} settings={settings}/>
            <div className="p-4 w-[533px] h-[400px] flex flex-col justify-between">
                {settings.showLatestResult && rankingEvolution
                    ? <RankingsSectionWithLatestResult
                        rankingEvolution={rankingEvolution}
                        rider={rider}
                        settings={settings}
                    />
                    : <RankingsSectionGeneral
                        riderPoints={riderPoints}
                        rider={rider}
                        settings={settings}
                    />
                }
                <RankingsTableSection
                    rider={rider}
                    riderPoints={settings.showActiveRanking 
                        ? (rankingEvolution
                            ? rankingEvolution.rankings.filter(rp => rp.riders.active)
                            : riderPoints.filter(rp => rp.riders.active)
                        )
                        : (rankingEvolution
                            ? rankingEvolution.rankings
                            : riderPoints
                        )
                    }
                    settings={settings}
                />
                <GroupedResults
                    rider={rider}
                    settings={settings}
                    pointSystem={pointSystem}
                />
            </div>
        </div>
    )
}