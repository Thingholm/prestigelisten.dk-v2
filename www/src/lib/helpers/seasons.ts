import { RiderSeasonPoints } from "@/db/seasons";

export type RiderSummedPoints = {
    rider_id: number;
    points_for_year: number;
}

export function sumRiderSeasonPointsRange(riderSeasons: RiderSeasonPoints[]) {
    const map = new Map<number, number>();

    for (const { rider_id, points_for_year } of riderSeasons) {
        map.set(
            rider_id,
            (map.get(rider_id) ?? 0) + (points_for_year ?? 0)
        );
    }

    return Array.from(map, ([rider_id, points_for_year]) => ({
        rider_id,
        points_for_year,
    }));
}