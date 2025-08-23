import { PointSystem } from "@/db/pointSystem";

type Result = {
    result_type_id: number;
    races: {
        race_class_id: number;
    }
}

export function getResultPoints(result: Result, pointSystem: PointSystem) {
    return pointSystem.find(i => 
        i.result_type_id == result.result_type_id 
        && i.race_class_id == result.races.race_class_id
    )?.points ?? 0;
}

export function getResultsWithPoints<T extends Result>(results: T[], pointSystem: PointSystem): (T & { points: number })[] {
    return results.map(r => ({
        ...r,
        points: getResultPoints(r, pointSystem)
    }))
}