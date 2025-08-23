import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllRiderPointsWithNationAndTeam = unstable_cache(async () => {
    const { data, error } = await riderPointsWithNationAndTeamQuery;
    
    if (error) { throw error; }

    return data as RiderPointsWithNationAndTeam;
}, ["allRiderPointsWithNation"], { revalidate: 60 * 60 });

const riderPointsWithNationAndTeamQuery = supabase
        .from("rider_points")
        .select(`
            *,
            riders (
                *,
                nations (
                    *
                ),
                teams (
                    *
                )
            )
        `)
        .order("points", { ascending: false });

export type RiderPointsWithNationAndTeam = QueryData<typeof riderPointsWithNationAndTeamQuery>
