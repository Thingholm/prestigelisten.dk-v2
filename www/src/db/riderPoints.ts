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

export const getRidersFromYear = async (year: number) => await unstable_cache(async () => {
    const currentYear = new Date().getFullYear();
    const { data, error } = await  ridersFromYearQuery()
        .eq("riders.year", year)
        .eq("riders.rider_seasons.year", currentYear);

    if (error) { throw error; }

    return data as RidersFromYear;
}, ["getRidersFromYear", year.toString()], { revalidate: 5 })()

const ridersFromYearQuery = () => supabase
    .from("rider_points")
    .select(`
        *,
        riders!inner (
            *,
            nations (
                *
            ),
            rider_seasons (
                *
            )
        )
    `)

export type RidersFromYear = QueryData<ReturnType<typeof ridersFromYearQuery>>;