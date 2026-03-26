import { Tables } from "@/lib/supabase/database.types";
import { Settings } from "./ContentWrapper";
import { Rider } from "@/lib/db/riders";
import { rankBy } from "@/lib/helpers/rank";
import RankDisplay from "./RankDisplay";
import { useT } from "@/lib/helpers/translations";


export default function RankingsSectionGeneral({
    riderPoints,
    rider,
    settings,
    locale
}: Readonly<{
    riderPoints: Tables<"riders">[],
    rider: Rider,
    settings: Settings,
    locale: "en" | "da"
}>) {
    const t = useT("twitterCard", locale);
    const tNations = useT("nations", locale);

    const alltimeRank = rankBy(riderPoints, "points").find(r => r.id == rider.id)?.rank;
    const activeRank = rankBy(riderPoints.filter(r => r.active), "points").find(r => r.id == rider.id)?.rank;
    const nationRank = rankBy(riderPoints.filter(r => r.nation_id == rider.nation_id), "points").find(r => r.id == rider.id)?.rank;
    const yearRank = rankBy(riderPoints.filter(r => r.year == rider.year), "points").find(r => r.id == rider.id)?.rank;
    
    return (
        <div>
            <p className="font-semibold">{t("placementsOnPrestigeList")}</p>
            <div className="flex justify-between gap-2 mt-1">
                {settings.showAllTimeRanking && alltimeRank && <RankDisplay rank={alltimeRank} title={t("allTime")}/>}
                {settings.showActiveRanking && activeRank && <RankDisplay rank={activeRank} title={t("active")}/>}
                {settings.showNationsRanking && nationRank && <RankDisplay rank={nationRank} title={tNations(`${rider.nations.code}.name`)}/>}
                {settings.showBirthYearRanking && yearRank && rider.year && <RankDisplay rank={yearRank} title={t("fromYear", { year: rider.year })}/>}
            </div>
        </div>
    )
}