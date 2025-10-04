import { PointSystem } from "@/db/pointSystem";
import { getResultsWithPoints } from "./pointSystem";

type Result = {
    result_type_id: number;
    races: {
        race_class_id: number;
        meta_race_id: number;
    },
    placement?: number | null;
}

export type GroupedResult<T extends Result> = T & {
    results: (T & { points: number })[];
    points: number;
}

export function groupResults<T extends Result>(results: T[], pointSystem: PointSystem, distinctPlacement: boolean = false ) {
    const resultsWithPoints = getResultsWithPoints(results, pointSystem);

    const groupsMap = new Map<string, T & GroupedResult<T>>();

    for (const result of resultsWithPoints) {
        let resultTypeId = result.result_type_id 

        if (8 <= resultTypeId && resultTypeId <= 11) {
            resultTypeId = 99;
        }

        if (distinctPlacement && 2 <= resultTypeId && resultTypeId <= 4 && result.placement) {
            resultTypeId = 100 + result.placement;
        }

        const key = `${resultTypeId}-${result.races.meta_race_id}`;

        if (!groupsMap.has(key)) {
            groupsMap.set(key, {
                ...result,
                results: [],
                result_type_id: resultTypeId,
                points: 0
            })
        }

        const group = groupsMap.get(key)!;
        group.results.push(result);
        group.points += result.points
    }

    return Array.from(groupsMap.values())
        .sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
        .sort((a, b) => b.results.length - a.results.length)
        .sort((a, b) => b.points - a.points);
}

export type GroupedByKey<T, K> = {
    key: K;
    results: (T & { points: number })[];
    points: number;
};

export function groupResultsByKey<T extends Result, K>(results: T[], pointSystem: PointSystem, keySelector: (result: T) => K): GroupedByKey<T, K>[] {
    const resultsWithPoints = getResultsWithPoints(results, pointSystem);

    const groupsMap = new Map<string, GroupedByKey<T, K>>();

    for (const result of resultsWithPoints) {
        const rawKey = keySelector(result);
        const keyString = typeof rawKey === "object" ? JSON.stringify(rawKey) : String(rawKey);

        if (!groupsMap.has(keyString)) {
        groupsMap.set(keyString, {
            key: rawKey,
            results: [],
            points: 0,
        });
        }

        const group = groupsMap.get(keyString)!;
        group.results.push(result);
        group.points += result.points;
    }

    return Array.from(groupsMap.values());
}