import { getPointSystem } from "@/db/pointSystem";
import { getResultsThisYear } from "@/db/results";
import { getAllRidersWithNationAndTeam, getRider } from "@/db/rider";
import { calculateRankingEvolutionForRider } from "@/lib/helpers/rankingEvolution";
import ContentWrapper from "./_sections/ContentWrapper";

export default async function TwitterImageGenerator({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const [
        rider,
        results,
        riderPoints,
        pointSystem,
    ] = await Promise.all([
        getRider(id)(),
        getResultsThisYear(),
        getAllRidersWithNationAndTeam(),
        getPointSystem()
    ])
    
    const rankingEvolution = rider.active && rider.results.some(result => result.year == new Date().getFullYear()) ? calculateRankingEvolutionForRider(results, riderPoints, pointSystem, rider.id) : null;

    return (
        <ContentWrapper
            rider={rider}
            rankingEvolution={rankingEvolution}
            riderPoints={riderPoints}
            pointSystem={pointSystem}
        />
    )
}