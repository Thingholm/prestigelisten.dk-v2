import { getPointSystem } from "@/db/pointSystem";
import { getRace } from "@/db/race";
import { getFirstRaceYear, getResultsInRaceRange } from "@/db/results";
// import { getRiders } from "@/db/rider";
import ProfileSection from "./_sections/ProfileSection";
import RaceTimelineSection from "./_sections/RaceTimelineSection";

export default async function RacePage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const race = await getRace(id);
    const results = await getResultsInRaceRange(race.races.map(r => r.id));
    const firstRaceYear = (await getFirstRaceYear()).min;
    // const riders = await getRiders();
    const pointSystem = await getPointSystem();

    const sortedResults = results.sort((a, b) => a.year - b.year);
    const firstEdition = sortedResults[0];
    const latestEdition = sortedResults[sortedResults.length - 1];
    console.log(sortedResults)

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
            <RaceTimelineSection
                metaRace={race}
                results={results}
                firstRaceYear={firstRaceYear}
            />
        </div>
    )
}