import { Tables } from "@/utils/supabase/database.types";
import { getResultTypeSortValue } from "./resultType"

type Result = {
    placement: number | null,
    stage: number |null,
    result_type_id: number
}

type GroupedResult = Tables<"results"> & {
    points: number;
    races: Tables<"races"> & {
        meta_races: Tables<"meta_races">
    };
    results: unknown[]
}
export function sortResults<T extends Result>(results: T[]) {
    return results.sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
        .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
        .sort((a, b) => getResultTypeSortValue(a.result_type_id) - getResultTypeSortValue(b.result_type_id))
}

export function sortGroupedResults(results: GroupedResult[]) {
    return results.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;

        if (b.results.length !== a.results.length) return b.results.length - a.results.length;

        const typeDiff = getResultTypeSortValue(a.result_type_id) - getResultTypeSortValue(b.result_type_id);
        if (typeDiff !== 0) return typeDiff;

        return a.races.meta_races.name.localeCompare(b.races.meta_races.name);
    });
}