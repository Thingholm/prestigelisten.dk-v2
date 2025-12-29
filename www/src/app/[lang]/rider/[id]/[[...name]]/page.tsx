import { getAllRidersWithNationAndTeam, getRider } from "@/db/rider";
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
import { getTranslations } from "next-intl/server";
import { deserializeQueryString } from "@/lib/helpers/urls";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da",  name: string[] }> }) {
    const { locale, name } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.riderPage'});
    const riderName = name?.[0] ? deserializeQueryString(name[0]) : t("rider")
    
    return {
        title: t('title', {rider: riderName}),
        description: t("description", {rider: riderName})
    };
}

export default async function RiderPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const [
        rider,
        pointSystem, 
        riderCountEachSeason, 
        nations, 
        previousNationalities,
        allRiders,
    ] = await Promise.all([
        getRider(id)(),
        getPointSystem(),
        getRiderCountEachSeason(),
        getNations(),
        getRidersPreviousNationalities(id)(),
        getAllRidersWithNationAndTeam()
    ])

    const rankedRiders = rankBy(allRiders, "points");
    const rankedActiveRiders = rankBy(rankedRiders.filter(r => r.active), "points");
    const rankedNationRiders = rankBy(rankedRiders.filter(r => r.nation_id == rider.nation_id), "points");
    const rankedYearRiders = rankBy(rankedRiders.filter(r => r.year == rider.year), "points");

    const groupedResults = groupResults(rider.results, pointSystem);

    return (
        <div>
            <ProfileSection
                rider={rider}
                activeRank={rankedActiveRiders.find(r => r.id == rider.id)?.rank}
                nationRank={rankedNationRiders.find(r => r.id == rider.id)?.rank}
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