import { getPointSystem } from "@/db/pointSystem";
import { getRace } from "@/db/race";
import { getResultsInRaceRange } from "@/db/results";
// import { getRiders } from "@/db/rider";
import ProfileSection from "./_sections/ProfileSection";

export default async function RacePage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const race = await getRace(id);
    const results = await getResultsInRaceRange(race.races.map(r => r.id));
    // const riders = await getRiders();
    const pointSystem = await getPointSystem();

    const sortedResults = results.sort((a, b) => b.year - a.year);
    const firstEdition = sortedResults[sortedResults.length - 1];
    const latestEdition = sortedResults[0];

    const latestEditionRaceClass = race.races.find(r => r.id == latestEdition?.race_id)?.race_classes;

    return (
        <div>
            <ProfileSection 
                race={race} 
                firstEdition={firstEdition}
                latestEdition={latestEdition}
                latestEditionRaceClass={latestEditionRaceClass}
                pointSystem={pointSystem}
            />
        </div>
    )
}