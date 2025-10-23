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

export const getActiveRiderPointsLookup = unstable_cache(async () => {
    const { data, error } = await activeRiderPointsLookupQuery;

    if (error) { throw error; }

    return data as ActiveRiderPointsLookup;
}, ["getActiveRiders"], { revalidate: 60 * 60 });

const activeRiderPointsLookupQuery = supabase
    .from("rider_points")
    .select(`
        id,
        points,
        rider_id,
        riders!inner (
            active
        )
    `)
    .eq("riders.active", true);
    
export type ActiveRiderPointsLookup = QueryData<typeof activeRiderPointsLookupQuery>

export const getRidersFromYear = (year: number) => unstable_cache(async () => {
    const currentYear = new Date().getFullYear();
    const { data, error } = await  ridersFromYearQuery()
        .eq("riders.year", year)
        .eq("riders.rider_seasons.year", currentYear);

    if (error) { throw error; }

    return data as RidersFromYear;
}, ["getRidersFromYear", year.toString()], { revalidate: 60 * 60 })

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