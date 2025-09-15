import { getResultTypeSortValue } from "./resultType"

type Result = {
    placement: number | null,
    stage: number |null,
    result_type_id: number
}

export function sortResults<T extends Result>(results: T[]) {
    return results.sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
        .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
        .sort((a, b) => getResultTypeSortValue(a.result_type_id) - getResultTypeSortValue(b.result_type_id))
}