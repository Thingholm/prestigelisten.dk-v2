import { Rider } from "@/db/rider";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Settings } from "./ContentWrapper";
import { useTranslations } from "use-intl";
import { rankBy } from "@/lib/helpers/rank";
import RankDisplay from "../_components/RankDisplay";

export default function RankingsSectionGeneral({
    riderPoints,
    rider,
    settings
}: Readonly<{
    riderPoints: RiderPointsWithNationAndTeam,
    rider: Rider,
    settings: Settings
}>) {
    const t = useTranslations("twitterCard");
    const tNations = useTranslations("nations")

    const alltimeRank = rankBy(riderPoints, "points").find(r => r.rider_id == rider.id)?.rank;
    const activeRank = rankBy(riderPoints.filter(r => r.riders.active), "points").find(r => r.rider_id == rider.id)?.rank;
    const nationRank = rankBy(riderPoints.filter(r => r.riders.nation_id == rider.nation_id), "points").find(r => r.rider_id == rider.id)?.rank;
    const yearRank = rankBy(riderPoints.filter(r => r.riders.year == rider.year), "points").find(r => r.rider_id == rider.id)?.rank;
    
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