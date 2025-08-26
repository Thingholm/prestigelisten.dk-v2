import { PointSystem } from "@/db/pointSystem";
import { getResultsWithPoints } from "./pointSystem";

type Result = {
    result_type_id: number;
    races: {
        race_class_id: number;
        meta_race_id: number;
    }
}

type GroupedResult<T> =  {
    results: (T & { points: number })[];
    points: number;
}

export function groupResults<T extends Result>(results: T[], pointSystem: PointSystem) {
    const resultsWithPoints = getResultsWithPoints(results, pointSystem);

    const groupsMap = new Map<string, T & GroupedResult<T>>();

    for (const result of resultsWithPoints) {
        let resultTypeId = result.result_type_id 

        if (8 <= resultTypeId && resultTypeId <= 11) {
            resultTypeId = 99;
        }

        const key = `${resultTypeId}-${result.races.meta_race_id}`;

        if (!groupsMap.has(key)) {
            groupsMap.set(key, {
                ...result,
                results: [],
                points: 0
            })
        }

        const group = groupsMap.get(key)!;
        group.results.push(result);
        group.points += result.points
    }

    return Array.from(groupsMap.values()).sort((a, b) => b.points - a.points);
}