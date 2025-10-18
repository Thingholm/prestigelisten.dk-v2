import { getPointSystem } from "@/db/pointSystem";
import { getResultsThisYear } from "@/db/results";
import { getRider } from "@/db/rider";
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { calculateRankingEvolution } from "@/lib/helpers/rankingEvolution";
import ContentWrapper from "./_sections/ContentWrapper";

export default async function TwitterImageGenerator({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const rider = await getRider(id)();

    const results = await getResultsThisYear();
    const riderPoints = await getAllRiderPointsWithNationAndTeam();
    const pointSystem = await getPointSystem();
    
    const rankingsByDate = rider.active && rider.results.some(result => result.year == new Date().getFullYear()) ? calculateRankingEvolution(results, riderPoints, pointSystem) : null;

    return (
        <ContentWrapper 
            rider={rider} 
            rankingEvolutions={rankingsByDate}
            riderPoints={riderPoints}
            pointSystem={pointSystem}
        />
    )
}