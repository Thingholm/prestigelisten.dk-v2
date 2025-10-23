import { EntityProfileSection, ProfileAttribute, ProfileDetails, ProfileHighlightSection, ProfileMainSection, ProfileTitle } from "@/components/entityPage";
import RiderImage from "@/components/entityPage/RiderImage";
import ResultNameListItem from "@/components/ResultNameListItem";
import FlagSpan from "@/components/table/FlagSpan";
import { RidersPreviousNationality } from "@/db/prevNationalities";
import { Rider } from "@/db/rider";
import { GroupedResult } from "@/lib/helpers/groupResults";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getRiderName } from "@/lib/helpers/riderName";
import { getNationUrl, getRidersListUrl, getTeamUrl, getYearUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function ProfileSection({
    rider,
    activeRank,
    nationRank,
    groupedResults,
    previousNationalities
}: Readonly<{
    rider: Rider,
    activeRank?: number | null,
    nationRank?: number | null,
    groupedResults: GroupedResult<Rider["results"][number]>[],
    previousNationalities: RidersPreviousNationality[]
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
                    
                    {previousNationalities.length > 0 
                        ? <p className="flex flex-wrap justify-center sm:justify-start gap-x-1 sm:max-w-[40vw]">
                            <span>{t("nationality")}: </span>
                            {previousNationalities
                                .sort((a, b) => (b.end_year ?? 9999) - (a.end_year ?? 9999))
                                .map((previousNationality, index) => (
                                    <span key={previousNationality.id} className="font-semibold text-nowrap">
                                        <Link href={getNationUrl(previousNationality.nations)} className="hover:underline">
                                            <FlagSpan code={previousNationality.nations.code}/> 
                                            <span>{tNations(`${previousNationality.nations.code}.name`)} {`(${previousNationality.start_year ?? ""}-${previousNationality.end_year ?? ""})`}</span>
                                        </Link>
                                        {index < previousNationalities.length - 1 && ", "}
                                    </span>
                                )
                            )}
                        </p>
                        : <ProfileAttribute label={t("nationality")} href={getNationUrl(rider.nations)}>
                            <FlagSpan code={rider.nations.code}/> 
                            <span>{tNations(`${rider.nations.code}.name`)}</span>
                        </ProfileAttribute>
                    }

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
                    {sortGroupedResults(groupedResults).slice(0, 8).map(group => (
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