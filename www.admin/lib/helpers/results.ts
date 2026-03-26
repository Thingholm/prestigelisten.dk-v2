import { Tables } from "@/utils/supabase/database.types";
import { getResultTypeSortValue } from "./resultType"
import { Race } from "@/db/race";

type Result = {
    placement: number | null,
    stage: number |null,
    result_type: number
}

type GroupedResult<T = Tables<'results'> & { races: Race }> = Tables<"results"> & {
    points: number;
    races: Tables<"races"> & {
        meta_races: Tables<"meta_races">
    };
    results: T[]
}

export function sortResults<T extends Result>(results: T[]) {
    return results.sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
        .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
        .sort((a, b) => getResultTypeSortValue(a.result_type) - getResultTypeSortValue(b.result_type))
}

export function sortGroupedResults<T = Tables<'results'> & { races: Race }>(results: GroupedResult<T>[]) {
    return results.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;

        if (b.results.length !== a.results.length) return b.results.length - a.results.length;

        const typeDiff = getResultTypeSortValue(a.result_type) - getResultTypeSortValue(b.result_type);
        if (typeDiff !== 0) return typeDiff;

        return a.races.meta_races.name.localeCompare(b.races.meta_races.name);
    });
}