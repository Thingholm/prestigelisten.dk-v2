import { Settings } from "./ContentWrapper";
import RankingsSectionGeneral from "./RankingsSectionGeneral";
import RankingsSectionWithLatestResult from "./RankingsSectionWithLatestResult";
import RankingsTableSection from "./RankingsTableSection";
import GroupedResults from "./GroupedResults";
import { RankingEvolution } from "@/app/dashboard/some-images/[id]/page";
import { Rider } from "@/lib/db/riders";
import { Tables } from "@/lib/supabase/database.types";
import InstagramProfile from "./InstagramProfile";

export default function InstagramCard({
    rankingEvolutions,
    rider,
    settings,
    ref,
    riderPoints,
    pointSystem,
    locale
}: Readonly<{
    rankingEvolutions:  RankingEvolution[] | null,
    rider: Rider,
    settings: Settings,
    ref: React.RefObject<HTMLDivElement>,
    riderPoints: Tables<"riders">[],
    pointSystem: Tables<"point_system">[],
    locale: "en" | "da"
}>) {
    const rankingEvolution = rankingEvolutions?.find(e => e.results.some(r => r.key == rider.id));

    return (
        <div className="h-240 w-135 flex-col" ref={ref}>
            <InstagramProfile rider={rider} settings={settings} locale={locale}/>
            <div className="p-4 w-full grid gap-6">
                {settings.showLatestResult && rankingEvolution
                    ? <RankingsSectionWithLatestResult
                        rankingEvolution={rankingEvolution}
                        rider={rider}
                        settings={settings}
                        locale={locale}
                    />
                    : <RankingsSectionGeneral
                        riderPoints={riderPoints}
                        rider={rider}
                        settings={settings}
                        locale={locale}
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
                    locale={locale}
                />
                <GroupedResults
                    rider={rider}
                    settings={settings}
                    pointSystem={pointSystem}
                    locale={locale}
                />
            </div>
        </div>
    )
}