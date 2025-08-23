import { PointSystem } from "@/db/pointSystem";
import { getResultsWithPoints } from "./pointSystem";

type Result = {
    result_type_id: number;
    races: {
        race_class_id: number;
        meta_race_id: number;
    }
}

type GroupedResult =  {
    results: (Result & { points: number })[];
    points: number;
}

export function groupResults<T extends Result>(results: T[], pointSystem: PointSystem) {
    const resultsWithPoints = getResultsWithPoints(results, pointSystem);

    const groupsMap = new Map<string, T & GroupedResult>();

    for (const result of resultsWithPoints) {
        const key = `${result.result_type_id}-${result.races.meta_race_id}`;

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