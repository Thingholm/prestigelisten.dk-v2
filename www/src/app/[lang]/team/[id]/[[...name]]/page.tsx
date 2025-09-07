import { getPointSystem } from "@/db/pointSystem";
import { getTeamsWithRiders, getTeamWithRiders } from "@/db/team";
import ProfileSection from "./_sections/ProfileSection";
import { rankBy } from "@/lib/helpers/rank";
import TeamsTablesSection from "./_sections/TeamsTablesSection";
import GreatestRidersSection from "./_sections/GreatestRidersSection";
import { getActiveRiderPointsLookup } from "@/db/riderPoints";

export default async function TeamPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;
    const currentYear = new Date().getFullYear();

    const teamWithRiders = await getTeamWithRiders(id);
    const teamsWithRiders = await getTeamsWithRiders();
    const pointSystem = await getPointSystem();
    const activeRiderPointsLookup = await getActiveRiderPointsLookup();

    const teamsWithPoints = teamsWithRiders?.map(team => {
        const pointsForYear = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_for_year || 0);
        }, 0);

        const pointsAllTime = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_all_time || 0);
        }, 0);
        return {
            ...team,
            pointsForYear,
            pointsAllTime
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
        </div>
    )
}