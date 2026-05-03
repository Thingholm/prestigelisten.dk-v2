"use server";

import { getRiderSeasonPointsForRange } from "@/db/seasons";
import { sumRiderSeasonPointsRange } from "@/lib/helpers/seasons";

export async function getRiderPointsForRange(start: number, end: number) {
    if (start > end) {
        throw new Error("Start year must be less than or equal to end year");
    }

    const data = await getRiderSeasonPointsForRange(start, end)();

    return sumRiderSeasonPointsRange(data);
}
    