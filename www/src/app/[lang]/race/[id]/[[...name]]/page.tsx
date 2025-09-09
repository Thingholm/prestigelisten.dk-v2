import { getPointSystem } from "@/db/pointSystem";
import { getRace } from "@/db/race";
import { getFirstRaceYear, getResultsInRaceRange } from "@/db/results";
import ProfileSection from "./_sections/ProfileSection";
import RaceTimelineSection from "./_sections/RaceTimelineSection";
import { groupResultsByKey } from "@/lib/helpers/groupResults";
import { rankBy } from "@/lib/helpers/rank";
import { getRiders } from "@/db/rider";
import MostPointsInRaceSection from "./_sections/MostPointsInRaceSection";

export default async function RacePage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const race = await getRace(id);
    const riders = await getRiders();
    const pointSystem = await getPointSystem();
    const firstRaceYear = (await getFirstRaceYear()).min;
    const results = (await getResultsInRaceRange(race.races.map(r => r.id))).map(result => ({
        ...result,
        races: race.races.find(r => r.id == result.race_id)!,
        riders: riders.find(rider => rider.id == result.rider_id)!
    }));


    const sortedResults = results.sort((a, b) => a.year - b.year);
    const firstEdition = sortedResults[0];
    const latestEdition = sortedResults[sortedResults.length - 1];

    const latestEditionRaceClass = race.races.find(r => r.id == latestEdition?.race_id)?.race_classes;

    const groupResultsByRider = rankBy(groupResultsByKey(results, pointSystem, r => r.riders), "points");
    const groupResultsByNation = rankBy(groupResultsByKey(results, pointSystem, r => r.riders?.nations), "points");

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
            <MostPointsInRaceSection groupResultsByRider={groupResultsByRider} groupResultsByNation={groupResultsByNation}/>
        </div>
    )
}