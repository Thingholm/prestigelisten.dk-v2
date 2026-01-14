import FlagSpan from "@/components/table/FlagSpan"
import { TeamWithRiders } from "@/db/team"
import { formatNumber } from "@/lib/helpers/localeHelpers"
import { Ranked } from "@/lib/helpers/rank"
import { getNationUrl, getRiderUrl } from "@/lib/helpers/urls"
import { useTranslations } from "next-intl"
import { TeamsWithPoints } from "../../../_sections/TeamsTablesSection"
import ProfileHighlightSection from "@/components/entityPage/ProfileHighlightSection"
import { EntityProfileSection, ProfileAttribute, ProfileDetails, ProfileMainSection, ProfileTitle, TeamLogo } from "@/components/entityPage"
import { Link } from "@/i18n/navigation"
import { getRiderName } from "@/lib/helpers/riderName"

export default function ProfileSection({
    currentYear,
    teamWithRiders,
    teamsRankedAllTime,
    teamsRankedForYear
}: Readonly<{
    currentYear: number,
    teamWithRiders: TeamWithRiders
    teamsRankedAllTime: Ranked<TeamsWithPoints>[]
    teamsRankedForYear: Ranked<TeamsWithPoints>[]
}>) {
    const t = useTranslations("teamPage");
    const tNations = useTranslations("nations");

    return (
        <EntityProfileSection>
            <ProfileMainSection>
                <TeamLogo team={teamWithRiders} />
                <ProfileDetails>
                    <ProfileTitle>{teamWithRiders.name}</ProfileTitle>

                    <ProfileAttribute label={t("profile.nation")} href={getNationUrl(teamWithRiders.nations)}>
                        {(teamWithRiders.nations?.code 
                            ? <><FlagSpan code={teamWithRiders.nations.code}/>{tNations(`${teamWithRiders.nations.code}.name`)}</>
                            : "-"
                        )}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.founded")}>
                        {/* TODO: Remove hardcoded string and add actual founded year property when added */}
                        2010 (Eksempel)
                        {/* {teamWithRiders.founded_year || "-"} */}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.points")}>
                        {formatNumber(teamWithRiders.riders.reduce((acc, obj) => {
                            return acc + obj.rider_seasons[0]?.points_all_time || 0;
                        }, 0))}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.placementAllTeams")}>
                        {teamsRankedAllTime.find(team => team.id === teamWithRiders.id)?.rank ?? "-"}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.numberOfResultsThisYear", { year: currentYear })}>
                        {teamWithRiders.riders.reduce((acc, obj) => {
                            return acc + obj.results.length || 0;
                        }, 0)}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.pointsGainedThisYear", { year: currentYear })}>
                         {formatNumber(teamWithRiders.riders.reduce((acc, obj) => {
                            return acc + (obj.rider_seasons[0]?.points_for_year ?? 0) || 0;
                        }, 0))}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.placementThisYear", { year: currentYear })}>
                        {teamsRankedForYear.find(team => team.id === teamWithRiders.id)?.rank ?? "-"}
                    </ProfileAttribute>
                </ProfileDetails>
            </ProfileMainSection>
            <ProfileHighlightSection title={t("titles.greatestRiders")}>
                {teamWithRiders.riders.sort((a, b) => (b.rider_seasons[0]?.points_all_time || 0) - (a.rider_seasons[0]?.points_all_time || 0))
                    .slice(0,7)
                    .map(rider => (
                        <p key={rider.id}>
                            <Link href={getRiderUrl(rider)} className="font-medium hover:underline">{getRiderName(rider)}</Link>
                            <span> - {formatNumber(rider.rider_seasons[0]?.rank_all_time)}</span>
                        </p>
                    )
                )}
            </ProfileHighlightSection>
        </EntityProfileSection>
    )
}