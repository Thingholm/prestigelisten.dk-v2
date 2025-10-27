import { getPointSystem } from "@/db/pointSystem";
import { getRace } from "@/db/race";
import { getFirstRaceYear, getResultsInRaceRange, ResultsInRaceRange } from "@/db/results";
import ProfileSection from "./_sections/ProfileSection";
import RaceTimelineSection from "./_sections/RaceTimelineSection";
import { groupResults, groupResultsByKey } from "@/lib/helpers/groupResults";
import { rankBy } from "@/lib/helpers/rank";
import { getRiders } from "@/db/rider";
import MostPointsInRaceSection from "./_sections/MostPointsInRaceSection";
import EditionsResultsSection from "./_sections/EditionsResultsSection";
import { getResultTypes } from "@/db/resultTypes";
import MostOfEachResultSection from "./_sections/MostOfEachResultSection";
import { Tables } from "@/utils/supabase/database.types";
import { getGeneralResultType } from "@/lib/helpers/resultType";

export type Result = (ResultsInRaceRange[number] & {
    races: (Tables<"races"> & {
        race_classes: Tables<"race_classes">
    }),
    riders: (Tables<"riders"> & {
        nations: Tables<"nations">
    }),
    result_types: Tables<"result_types">
})

export default async function RacePage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const race = await getRace(id)();
    const riders = await getRiders();
    const pointSystem = await getPointSystem();
    const resultTypes = await getResultTypes();
    const firstRaceYear = (await getFirstRaceYear()).min;
    const results = (await getResultsInRaceRange(race.races.map(r => r.id))()).map(result => ({
        ...result,
        races: race.races.find(r => r.id == result.race_id)!,
        riders: riders.find(rider => rider.id == result.rider_id)!,
        result_types: resultTypes.find(resultType => resultType.id == result.result_type_id)!
    })) as Result[];


    const sortedResults = results.sort((a, b) => a.year - b.year);
    const firstEdition = sortedResults[0];
    const latestEdition = sortedResults[sortedResults.length - 1];

    const latestEditionRaceClass = race.races.find(r => r.id == latestEdition?.race_id)?.race_classes ?? race.races[0].race_classes;

    const groupResultsByRider = rankBy(groupResultsByKey(results, pointSystem, r => r.riders), "points");
    const groupResultsByNation = rankBy(groupResultsByKey(results, pointSystem, r => r.riders?.nations), "points");
    const groupResultsByRiderThenResult = groupResults(results, pointSystem).map(groupedResults => ({...groupedResults, results: groupResultsByKey(groupedResults.results, pointSystem, r => r.riders)}))

    const resultTypesForRace = [...new Set(race.races.flatMap(r => pointSystem.filter(ps => ps.race_class_id == r.race_class_id).map(ps => getGeneralResultType(ps.result_type_id))))]

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
                firstRaceYear={firstRaceYear ?? new Date().getFullYear()}
            />
            {sortedResults.length > 0 &&
                <>
                    <MostPointsInRaceSection groupResultsByRider={groupResultsByRider} groupResultsByNation={groupResultsByNation}/>
                    <EditionsResultsSection results={results} pointSystem={pointSystem}/>
                    <MostOfEachResultSection groupedResults={groupResultsByRiderThenResult} resultTypes={resultTypesForRace}/>
                </>
            }
        </div>
    )
}