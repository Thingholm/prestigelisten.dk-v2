import { getRider } from "@/db/rider";
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import ProfileSection from "./_sections/ProfileSection";
import { getPointSystem } from "@/db/pointSystem";
import { groupResults } from "@/lib/helpers/groupResults";
import ChartSection from "./_sections/ChartSection";
import ResultsEachYearSection from "./_sections/ResultsEachYearSection";
import { getRiderCountEachSeason } from "@/db/seasons";
import TablesSection from "./_sections/TablesSection";
import AllResultsSection from "./_sections/AllResultsSection";
import { getNations } from "@/db/nations";
import { getRidersPreviousNationalities } from "@/db/prevNationalities";

export default async function RiderPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const rider = await getRider(id)();
    const pointSystem = await getPointSystem();
    const riderCountEachSeason = await getRiderCountEachSeason();
    const nations = await getNations();
    const previousNationalities = await getRidersPreviousNationalities(id)();

    const rankedRiders = rankBy((await getAllRiderPointsWithNationAndTeam()), "points");
    const rankedActiveRiders = rankBy(rankedRiders.filter(r => r.riders.active), "points");
    const rankedNationRiders = rankBy(rankedRiders.filter(r => r.riders.nation_id == rider.nation_id), "points");
    const rankedYearRiders = rankBy(rankedRiders.filter(r => r.riders.year == rider.year), "points");

    const groupedResults = groupResults(rider.results, pointSystem);

    return (
        <div>
            <ProfileSection
                rider={rider}
                activeRank={rankedActiveRiders.find(r => r.rider_id == rider.id)?.rank}
                nationRank={rankedNationRiders.find(r => r.rider_id == rider.id)?.rank}
                groupedResults={groupedResults}
                previousNationalities={previousNationalities}
            />
            <ChartSection rider={rider} pointSystem={pointSystem}/>
            <ResultsEachYearSection 
                rider={rider} 
                pointSystem={pointSystem} 
                riderCountEachSeason={riderCountEachSeason}
            />
            <TablesSection
                rider={rider}
                rankedRidersByNation={rankedNationRiders}
                rankedRidersByYear={rankedYearRiders}
            />
            <AllResultsSection 
                rider={rider} 
                pointSystem={pointSystem}
                nations={nations}
            />
        </div>
    )
}