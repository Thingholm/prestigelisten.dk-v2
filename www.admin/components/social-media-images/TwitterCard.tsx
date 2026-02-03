import { Settings } from "./ContentWrapper";
import Profile from "./Profile";
import RankingsSectionGeneral from "./RankingsSectionGeneral";
import RankingsSectionWithLatestResult from "./RankingsSectionWithLatestResult";
import RankingsTableSection from "./RankingsTableSection";
import GroupedResults from "./GroupedResults";
import { RankingEvolution } from "@/app/dashboard/some-images/[id]/page";
import { Rider } from "@/lib/db/riders";
import { Tables } from "@/lib/supabase/database.types";

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
    riderPoints: Tables<"riders">[],
    pointSystem: Tables<"point_system">[]
}>) {
    const rankingEvolution = rankingEvolutions?.find(e => e.results.some(r => r.key == rider.id));

    return (
        <div className="h-100 w-191.25 flex" ref={ref}>
            <Profile rider={rider} settings={settings}/>
            <div className="p-4 w-133.25 h-100 flex flex-col justify-between">
                {/* {settings.showLatestResult && rankingEvolution
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
                    riderPoints={settings.showActiveRankingTable 
                        ? (rankingEvolution
                            ? rankingEvolution.rankings.filter(rp => rp.active)
                            : riderPoints.filter(rp => rp.active)
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
                /> */}
            </div>
        </div>
    )
}