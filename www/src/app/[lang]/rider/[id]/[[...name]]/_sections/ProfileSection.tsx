import { EntityProfileSection, ProfileAttribute, ProfileDetails, ProfileHighlightSection, ProfileMainSection, ProfileTitle } from "@/components/entityPage";
import RiderImage from "@/components/entityPage/RiderImage";
import ResultNameListItem from "@/components/ResultNameListItem";
import FlagSpan from "@/components/table/FlagSpan";
import { Rider } from "@/db/rider";
import { GroupedResult } from "@/lib/helpers/groupResults";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { getRiderName } from "@/lib/helpers/riderName";
import { getNationUrl, getRidersListUrl, getTeamUrl, getYearUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";

export default async function ProfileSection({
    rider,
    activeRank,
    nationRank,
    groupedResults
}: Readonly<{
    rider: Rider,
    activeRank?: number | null,
    nationRank?: number | null,
    groupedResults: GroupedResult<Rider["results"][number]>[]
}>) {
    const t = await getTranslations("riderPage.profile");
    const tNations = await getTranslations("nations")
    const tResultNames = await getTranslations("getResultNames");

    return (
        <EntityProfileSection>
            <ProfileMainSection>
                <RiderImage rider={rider}/>
                <ProfileDetails>
                    <ProfileTitle>{getRiderName(rider)}</ProfileTitle>
                    
                    <ProfileAttribute label={t("nationality")} href={getNationUrl(rider.nations)}>
                        <FlagSpan code={rider.nations.code}/> 
                        <span>{tNations(`${rider.nations.code}.name`)}</span>
                    </ProfileAttribute>

                    <ProfileAttribute label={t("year")} href={getYearUrl(rider.year)}>
                        {rider.year ?? "-"}
                    </ProfileAttribute>

                    {rider.active &&
                        <ProfileAttribute label={t("team")} href={getTeamUrl(rider.teams)}>
                            {rider.teams?.name ?? "-"}
                        </ProfileAttribute>
                    }

                    <ProfileAttribute label={t("allTimePlacement")} href={getRidersListUrl()}>
                        {formatNumber(rider.rider_seasons.find(season => season.year = new Date().getFullYear())?.rank_all_time) ?? "-"}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("nationPlacement", { nation: tNations(`${rider.nations.code}.name`)})} href={getRidersListUrl({ nations: [rider.nation_id]})}>
                        {formatNumber(nationRank) ?? "-"}
                    </ProfileAttribute>

                    {rider.active &&
                        <ProfileAttribute label={t("activePlacement")} href={getRidersListUrl({ status: "active"})}>
                            {formatNumber(activeRank) ?? "-"}
                        </ProfileAttribute>
                    }

                    <ProfileAttribute label={t("points")}>
                        {formatNumber(rider.rider_points[0]?.points)}
                    </ProfileAttribute>
                </ProfileDetails>
            </ProfileMainSection>

            <ProfileHighlightSection title={t("greatestResults")} isGroupedResults>
                <ul>
                    {groupedResults.slice(0, 8).map(group => (
                        <ResultNameListItem
                            key={group.id}
                            resultName={getGroupedResultName(group, tResultNames)}
                            metaRace={group.races.meta_races}
                            count={group.results.length}
                            points={group.points}
                        />
                    ))}
                </ul>
            </ProfileHighlightSection>
        </EntityProfileSection>
    )
}