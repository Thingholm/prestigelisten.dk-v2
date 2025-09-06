import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getTeamsWithRiders = unstable_cache(async () => {
    const { data, error } = await teamsWithRidersQuery;

    if (error) { throw error; }

    return data;
}, ["teamsWithRiders"], { revalidate: 2 });

const teamsWithRidersQuery = supabase
    .from("teams")
    .select(`
        *,
        riders!inner (
            rider_seasons!inner (
                points_for_year,
                year,
                points_all_time
            )
        ),
        nations (
            *
        )  
    `)
    .eq("riders.rider_seasons.year", new Date().getFullYear())
    
export type TeamsWithRiders = QueryData<typeof teamsWithRidersQuery>;

export const getTeamWithRiders = (teamId: number) => unstable_cache(async () => {
    const { data, error } = await teamWithRidersQuery.eq("id", teamId).single();

    if (error) { throw error; }

    return data as TeamWithRiders;
}, ["teamWithRiders", teamId.toString()], { revalidate: 60 * 60 })();

const teamWithRidersQuery = supabase
    .from("teams")
    .select(`
        *,
        riders!inner (
            *,
            nations (
                *
            ),
            rider_seasons (
                *
            ),
            results (
                *,
                races (
                    *,
                    meta_races (
                        *,
                        nations (
                            *
                        )
                    )
                )           
            )
        ),
        nations (
            *
        )  
    `)
    .eq("riders.rider_seasons.year", new Date().getFullYear())
    .eq("riders.results.year", new Date().getFullYear());

export type TeamWithRiders = QueryData<typeof teamWithRidersQuery>[number];