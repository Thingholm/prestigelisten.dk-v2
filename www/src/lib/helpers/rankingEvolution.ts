import { PointSystem } from "@/db/pointSystem";
import { GroupedByKey, groupResultsByKey } from "./groupResults";
import { rankBy, Ranked } from "./rank";
import { Tables } from "@/utils/supabase/database.types";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";

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
    rankings: Ranked<RiderPointsWithNationAndTeam[number]>[];
    prevRankings: Ranked<RiderPointsWithNationAndTeam[number]>[] | null;
    key: string | undefined;
    points: number;
}

export function calculateRankingEvolution(results: ResultWithRaceDate[], riderPoints: (RiderPointsWithNationAndTeam[number])[], pointSystem: PointSystem): RankingEvolution[] {
    const groupedResultsByDate = groupResultsByKey(results, pointSystem, r => r.race_dates?.date ?? "other").sort((a, b) => Date.parse(b.key ?? "") - Date.parse(a.key ?? ""));

    let prevRankings: Ranked<RiderPointsWithNationAndTeam[number]>[] | null;
    const rankingsByDate = groupedResultsByDate.map(group => {
        const groupedByRider = groupResultsByKey(group.results, pointSystem, r => r.rider_id);

        if (!prevRankings) {
            prevRankings = rankBy(riderPoints, "points");
        }

        const newRankings = prevRankings;

        prevRankings = JSON.parse(JSON.stringify(rankBy(prevRankings.map(rp => ({
            ...rp,
            points: rp.points - (groupedByRider.find(riderGroup => riderGroup.key == rp.rider_id)?.points ?? 0)
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