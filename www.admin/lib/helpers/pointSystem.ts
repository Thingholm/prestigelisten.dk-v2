import { PointSystem } from "@/db/pointSystem";

type Result = {
    result_type: number;
    races: {
        race_class_id: number;
    }
}

export function getResultPoints(result: Result, pointSystem: PointSystem) {
    return pointSystem.find(i => 
        i.result_type == result.result_type 
        && i.race_class_id == result.races.race_class_id
    )?.points ?? 0;
}

export function getResultsWithPoints<T extends Result>(results: T[], pointSystem: PointSystem): (T & { points: number })[] {
    return results.map(r => ({
        ...r,
        points: getResultPoints(r, pointSystem)
    }))
}