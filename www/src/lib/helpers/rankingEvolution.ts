import { PointSystem } from "@/db/pointSystem";
import { GroupedByKey, groupResultsByKey } from "./groupResults";
import { rankBy, Ranked } from "./rank";
import { Tables } from "@/utils/supabase/database.types";
import { RidersWithNationAndTeam } from "@/db/rider";

export type ResultWithRaceDate = Tables<"results"> & {
    races: Tables<"races"> & {
        meta_races: Tables<"meta_races">
    }
    race_dates: Tables<"race_dates"> & {
        date: string;
        id: number;
        race_id: number;
        stage: number | null;
    } | null
    riders: Tables<"riders"> & {
        nations: Tables<"nations">
    }
}

export type RankingEvolution = {
    results: GroupedByKey<ResultWithRaceDate & {
        points: number;
    }, number>[];
    rankings: Ranked<RidersWithNationAndTeam[number]>[];
    prevRankings: Ranked<RidersWithNationAndTeam[number]>[] | null;
    key: string | undefined;
    points: number;
}

export function calculateRankingEvolution(results: ResultWithRaceDate[], riderPoints: (RidersWithNationAndTeam[number])[], pointSystem: PointSystem): RankingEvolution[] {
    const groupedResultsByDate = groupResultsByKey(results, pointSystem, r => r.race_dates?.date ?? "other").sort((a, b) => Date.parse(b.key ?? "") - Date.parse(a.key ?? ""));

    let prevRankings: Ranked<RidersWithNationAndTeam[number]>[] | null;
    const rankingsByDate = groupedResultsByDate.map(group => {
        const groupedByRider = groupResultsByKey(group.results, pointSystem, r => r.rider_id);

        if (!prevRankings) {
            prevRankings = rankBy(riderPoints, "points");
        }

        const newRankings = prevRankings;

        prevRankings = JSON.parse(JSON.stringify(rankBy(prevRankings.map(rp => ({
            ...rp,
            points: rp.points - (groupedByRider.find(riderGroup => riderGroup.key == rp.id)?.points ?? 0)
        })), "points")))

        return {
            ...group,
            results: groupedByRider.sort((a, b) => b.points - a.points),
            rankings: newRankings,
            prevRankings: prevRankings
        }
    })

    return rankingsByDate
}