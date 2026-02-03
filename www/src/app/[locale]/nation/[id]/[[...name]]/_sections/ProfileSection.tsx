import { EntityProfileSection, NationFlag, ProfileAttribute, ProfileDetails, ProfileHighlightSection, ProfileMainSection, ProfileTitle } from "@/components/entityPage";
import { NationWithRiders, NationWithTopRidersAndCount } from "@/db/nations";
import { Race } from "@/db/race";
import { urls } from "@/lib/constants/urls";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { Ranked } from "@/lib/helpers/rank";
import { getRiderName } from "@/lib/helpers/riderName";
import { getRiderUrl } from "@/lib/helpers/urls";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function ProfileSection({
    nation,
    rankedActiveNationPoints,
    races,
}: Readonly<{
    nation: NationWithRiders,
    rankedActiveNationPoints: Ranked<Tables<"nations">>[],
    races: Race[],
}>) {
    const t = useTranslations("nationPage.profile");
    const tNations = useTranslations("nations");

    const currentYear = new Date().getFullYear();
    const currentSeason = nation.nation_seasons.find(season => season.year == currentYear);

    const nationActivePoints = rankedActiveNationPoints.find(n => n.id == nation.id);

    const nationalsRaceIds = races.filter(race => [12, 13, 14, 15].includes(race.race_class_id)).map(race => race.id);
    const numberOfRidersWithPoints = nation.riders.length;
    const numberOfResults = nation.riders
        .flatMap(rider => rider.results)
        .filter(result => !nationalsRaceIds.includes(result.race_id))
        .length;

    return (
        <EntityProfileSection>
            <ProfileMainSection>
                <NationFlag nation={nation}/>
                <ProfileDetails>
                    <ProfileTitle>{tNations(`${nation.code}.name`)}</ProfileTitle>

                    <ProfileAttribute label={t("placement")} href={{ pathname: "/rankings/nations" }}>
                        {formatNumber(currentSeason?.rank_all_time) ?? "-"}
                    </ProfileAttribute>
                    
                    <ProfileAttribute label={t("points")} href={{ pathname: "/rankings/nations" }}>
                        {formatNumber(currentSeason?.points_all_time) ?? "-"}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("activePlacement")} href={{ pathname: "/rankings/nations" }}>
                        {formatNumber(nationActivePoints?.rank) ?? "-"}
                    </ProfileAttribute>
                    
                    <ProfileAttribute label={t("activePoints")} href={{ pathname: "/rankings/nations" }}>
                        {formatNumber(nationActivePoints?.active_points) ?? "-"}
                    </ProfileAttribute>                    
                    
                    <ProfileAttribute label={t("numberOfRidersWithPoints")}>
                        {formatNumber(numberOfRidersWithPoints) ?? "-"}
                    </ProfileAttribute>                    
                    
                    <ProfileAttribute label={t("resultCount")}>
                        {formatNumber(numberOfResults) ?? "-"}
                    </ProfileAttribute>
                </ProfileDetails>
            </ProfileMainSection>

            <ProfileHighlightSection title={t("greatestRiders", { nation: tNations(`${nation.code}.name`) })}>
                {nation.riders.sort((a, b) => (b.rider_seasons[0]?.points_all_time || 0) - (a.rider_seasons[0]?.points_all_time || 0))
                    .slice(0,7)
                    .map(rider => (
                        <p key={rider.id}>
                            <Link prefetch={false}  href={getRiderUrl(rider)} className="font-medium hover:underline">{getRiderName(rider)}</Link>
                            <span> - {formatNumber(rider.rider_seasons[0]?.rank_all_time)}</span>
                        </p>
                    )
                )}
            </ProfileHighlightSection>
        </EntityProfileSection>
    )
}