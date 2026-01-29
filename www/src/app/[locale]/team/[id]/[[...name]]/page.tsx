import { getPointSystem } from "@/db/pointSystem";
import { getTeamsWithRiders, getTeamWithRiders } from "@/db/team";
import ProfileSection from "./_sections/ProfileSection";
import { rankBy } from "@/lib/helpers/rank";
import TeamsTablesSection from "./_sections/TeamsTablesSection";
import GreatestRidersSection from "./_sections/GreatestRidersSection";
import ResultsForYearSection from "./_sections/ResultsForYearSection";
import { getActiveRiderPointsLookup } from "@/db/rider";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { deserializeQueryString } from "@/lib/helpers/urls";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da",  name: string[] }> }) {
    const { locale, name } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.teamPage'});
    const teamName = name?.[0] ? deserializeQueryString(name[0]) : t("team");
    
    return {
        title: t('title', {team: teamName}),
        description: t("description", {team: teamName})
    };
}

export default async function TeamPage({
    params,
}: Readonly<{
    params: Promise<{ id: number, locale: "en" | "da" }>
}>) {
    const { locale, id } = await params;    
    setRequestLocale(locale);
    const currentYear = new Date().getFullYear();

    const [
        teamWithRiders,
        teamsWithRiders, 
        pointSystem, 
        activeRiderPointsLookup, 
    ] = await Promise.all([
        getTeamWithRiders(id)(),
        getTeamsWithRiders(),
        getPointSystem(),
        getActiveRiderPointsLookup()
    ])

    const teamsWithPoints = teamsWithRiders?.map(team => {
        const pointsForYear = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_for_year || 0);
        }, 0);

        const pointsAllTime = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_all_time || 0);
        }, 0);

        const countForYear = team.riders.reduce((count, rider) => {
            return count + (rider.rider_seasons[0]?.points_for_year && rider.rider_seasons[0]?.points_for_year > 0 ? 1 : 0);
        }, 0);

        return {
            ...team,
            pointsForYear,
            pointsAllTime,
            countForYear
        };
    });
    
    const teamsRankedAllTime = rankBy(teamsWithPoints, "pointsAllTime");
    const teamsRankedForYear = rankBy(teamsWithPoints, "pointsForYear");

    const rankedActiveRiderPointsLookup = rankBy(activeRiderPointsLookup, "points");

    return (
        <div>
            <ProfileSection 
                currentYear={currentYear} 
                teamWithRiders={teamWithRiders} 
                teamsRankedAllTime={teamsRankedAllTime} 
                teamsRankedForYear={teamsRankedForYear}
            />
            <TeamsTablesSection 
                teamsRankedAllTime={teamsRankedAllTime} 
                teamsRankedForYear={teamsRankedForYear}
                teamId={id}
            />
            <GreatestRidersSection teamWithRiders={teamWithRiders} rankedActiveRiderPointsLookup={rankedActiveRiderPointsLookup}/>
            <ResultsForYearSection
                currentYear={currentYear}
                teamWithRiders={teamWithRiders}
                pointSystem={pointSystem}
            />
        </div>
    )
}