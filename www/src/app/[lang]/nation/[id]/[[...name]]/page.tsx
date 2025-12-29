import { getNations, getNationWithRiders, NationWithRiders } from "@/db/nations";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces, Race } from "@/db/race";
import ProfileSection from "./_sections/ProfileSection";
import { rankBy } from "@/lib/helpers/rank";
import { GetRidersWithPreviousNationality } from "@/db/prevNationalities";
import ChartsSection from "./_sections/ChartsSection";
import GreatestResultsSection from "./_sections/GreatestResultsSection";
import { Tables } from "@/utils/supabase/database.types";
import RidersSection from "./_sections/RidersSection";
import ResultsEachYearSection from "./_sections/ResultsEachYearSection";
import RacesAndTeamsSection from "./_sections/RacesAndTeamsSection";
import { getTeamsFromNation } from "@/db/team";
import { nationalsRaceClassIds } from "@/lib/constants/raceClasses";
import { getNationCountEachSeason } from "@/db/seasons";
import { getTranslations } from "next-intl/server";
import { nationCodeById } from "@/lib/constants/nations";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da",  id: number }> }) {
    const { locale, id } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.nation'});
    const tNations = await getTranslations({locale, namespace: 'nations'})
    
    return {
        title: t('title', {nation: tNations(`${nationCodeById[id]}.name`)}),
        description: t("description", {nation: tNations(`${nationCodeById[id]}.name`)})
    };
}

export type Nation = Omit<NationWithRiders, "riders"> & {
    riders: (NationWithRiders["riders"][number] & {
        nations: Tables<"nations"> | null
    })[]
}

export default async function NationPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const [
        nation,
        ridersWithPreviousNationality,
        teams,
        races,
        pointSystem,
        nations,
        nationCountEachSeason
    ] = await Promise.all([
        getNationWithRiders(id)(),
        GetRidersWithPreviousNationality(id)(),
        getTeamsFromNation(id)(),
        getRaces(),
        getPointSystem(),
        getNations(),
        getNationCountEachSeason()
    ]);

    nation.riders = [
        ...nation.riders.map(riders => ({...riders, nations: null})),
        ...ridersWithPreviousNationality.map(riders => riders.riders)
    ]

    const rankedActiveNationPoints = rankBy(nations, "active_points");

    const flatResults = nation.riders
        .flatMap(rider => rider.results)
        .reduce<(Tables<'results'> & { races: Race })[]>((results, result) => {
            const race = races.find(race => race.id == result.race_id);

            if (!race) return results;

            if (nationalsRaceClassIds.includes(race.race_class_id)) return results;

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
            <RidersSection nation={nation as Nation}/>
            <ResultsEachYearSection 
                nation={nation} 
                pointSystem={pointSystem} 
                results={flatResultsWithNc}
                nationCountEachSeason={nationCountEachSeason}
            />
            <RacesAndTeamsSection 
                nation={nation} 
                races={races}
                teams={teams}
            />
        </div>
    )
}