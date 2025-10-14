import { getRider } from "@/db/rider";
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import ProfileSection from "./_sections/ProfileSection";
import { getPointSystem } from "@/db/pointSystem";
import { groupResults } from "@/lib/helpers/groupResults";
import { sortGroupedResults } from "@/lib/helpers/results";
import ChartSection from "./_sections/ChartSection";
import ResultsEachYearSection from "./_sections/ResultsEachYearSection";
import { getRiderCountEachSeason } from "@/db/seasons";

export default async function RiderPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const rider = await getRider(id)();
    const pointSystem = await getPointSystem();
    const riderCountEachSeason = await getRiderCountEachSeason();

    const rankedRiders = rankBy((await getAllRiderPointsWithNationAndTeam()), "points");
    const rankedActiveRiders = rankBy(rankedRiders.filter(r => r.riders.active), "points");
    const rankedNationRiders = rankBy(rankedRiders.filter(r => r.riders.nation_id == rider.nation_id), "points");
    const rankedYearRiders = rankBy(rankedRiders.filter(r => r.riders.year == rider.year), "points");

    const groupedResults = sortGroupedResults(groupResults(rider.results, pointSystem));

    return (
        <div>
            <ProfileSection
                rider={rider}
                activeRank={rankedActiveRiders.find(r => r.rider_id == rider.id)?.rank}
                nationRank={rankedNationRiders.find(r => r.rider_id == rider.id)?.rank}
                groupedResults={groupedResults}
            />
            <ChartSection rider={rider} pointSystem={pointSystem}/>
            <ResultsEachYearSection 
                rider={rider} 
                pointSystem={pointSystem} 
                riderCountEachSeason={riderCountEachSeason}
            />
        </div>
    )
}