import { getNationWithRiders } from "@/db/nations";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces, Race } from "@/db/race";
import ProfileSection from "./_sections/ProfileSection";
import { getNationPoints } from "@/db/nationPoints";
import { rankBy } from "@/lib/helpers/rank";
import { GetRidersWithPreviousNationality } from "@/db/prevNationalities";
import ChartsSection from "./_sections/ChartsSection";
import GreatestResultsSection from "./_sections/GreatestResultsSection";
import { Tables } from "@/utils/supabase/database.types";
import RidersSection from "./_sections/RidersSection";
import ResultsEachYearSection from "./_sections/ResultsEachYearSection";
import RacesAndTeamsSection from "./_sections/RacesAndTeamsSection";
import { getTeamsFromNation } from "@/db/team";

export default async function NationPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const nation = await getNationWithRiders(id)();
    const ridersWithPreviousNationality = await GetRidersWithPreviousNationality(id)();
    const teams = await getTeamsFromNation(id)();
    const races = await getRaces();
    const pointSystem = await getPointSystem();
    const nationPoints = await getNationPoints();

    nation.riders = [
        ...nation.riders,
        ...ridersWithPreviousNationality.map(riders => riders.riders)
    ]

    const rankedActiveNationPoints = rankBy(nationPoints, "active_points");

    const flatResults = nation.riders
        .flatMap(rider => rider.results)
        .reduce<(Tables<'results'> & { races: Race })[]>((results, result) => {
            const race = races.find(race => race.id == result.race_id);

            if (!race) return results;

            if ([12, 13, 14, 15].includes(race.race_class_id)) return results;

            return [...results, {...result, races: race}]
        }, [])

    const flatResultsWithNc = nation.riders
        .flatMap(rider => rider.results)
        .reduce<(Tables<'results'> & { races: Race })[]>((results, result) => {
            const race = races.find(race => race.id == result.race_id);

            if (!race) return results;

            return [...results, {...result, races: race}]
        }, [])

    return (
        <div>
            <ProfileSection 
                nation={nation} 
                rankedActiveNationPoints={rankedActiveNationPoints}
                races={races}
            />
            <ChartsSection 
                nation={nation} 
                pointSystem={pointSystem}
                flatResults={flatResults}
            />
            <GreatestResultsSection
                nation={nation}
                pointSystem={pointSystem}
                results={flatResults}
            />
            <RidersSection nation={nation}/>
            <ResultsEachYearSection 
                nation={nation} 
                pointSystem={pointSystem} 
                results={flatResultsWithNc}
            />
            <RacesAndTeamsSection 
                nation={nation} 
                races={races}
                teams={teams}
            />
        </div>
    )
}