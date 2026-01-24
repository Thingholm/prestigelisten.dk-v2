import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getMinRiderBirthYear = unstable_cache(async () => {
    const { data, error } = await minRiderBirthYearQuery();

    if (error) { throw error; }

    return data as MinRiderBirthYear;
}, ["minRiderBirthYear"], { revalidate: 60 * 60 * 24  * 24 * 30})

const minRiderBirthYearQuery = () => supabase
    .from("riders")
    .select("year.min()")
    .maybeSingle();

export type MinRiderBirthYear = QueryData<ReturnType<typeof minRiderBirthYearQuery>>;

export const getMaxRiderBirthYear = unstable_cache(async () => {
    const { data, error } = await maxRiderBirthYearQuery();

    if (error) { throw error; }

    return data as MaxRiderBirthYear;
}, ["maxRiderBirthYear"], { revalidate: 60 * 60 * 24 })

const maxRiderBirthYearQuery = () => supabase
    .from("riders")
    .select("year.max()")
    .maybeSingle();

export type MaxRiderBirthYear = QueryData<ReturnType<typeof maxRiderBirthYearQuery>>;

export const getRiders = unstable_cache(async () => {
    const { data, error } = await ridersQuery();

    if (error) { throw error; }

    return data as Riders;
}, ["riders"], { revalidate: 60 * 60 * 24 })

const ridersQuery = () => supabase
    .from("riders")
    .select(`
        *,
        nations (
            *
        )
    `)

export type Riders = QueryData<ReturnType<typeof ridersQuery>>;

export const getRidersRange = (ids: number[]) => unstable_cache(async () => {
    const { data, error } = await supabase
        .from("riders")
        .select(`
            *,
            nations (
                *
            )
        `)
        .in("id", ids);

    if (error) { throw error; }

    return data as Riders;
}, ["ridersInRange", ids.toString()], { revalidate: 60 * 60 * 24  });

export const getRider = (id: number) => unstable_cache(async () => {
    const { data, error } = await supabase
        .from("riders")
        .select(`
            *,
            results (
                *,
                races (
                    *,
                    meta_races (
                        *,
                        nations (code)
                    )
                )
            ),
            nations (*),
            teams (*),
            rider_seasons (*),
            images (*)
        `)
        .eq("id", id)
        .maybeSingle();

    if (error) { throw error; }

    return data as Rider;
}, ["rider", id.toString()], { revalidate: 60 * 60 * 24  })

const riderQuery = supabase
    .from("riders")
    .select(`
        *,
        results (
            *,
            races (
                *,
                meta_races (
                    *,
                    nations (*)
                )            
            )
        ),
        nations (*),
        teams (*),
        rider_seasons (*),
        images (*)
    `)

export type Rider = QueryData<typeof riderQuery>[number];

export const getAllRidersWithNationAndTeam = unstable_cache(async () => {
    const { data, error } = await ridersWithNationAndTeamQuery();
    
    if (error) { throw error; }

    return data as RidersWithNationAndTeam;
}, ["allRidersWithNationAndTeam"], { revalidate: 60 * 60 * 24  });

const ridersWithNationAndTeamQuery = () => supabase
    .from("riders")
    .select(`
        *,
        nations (*),
        teams (*)
    `)
    .order("points", { ascending: false });

export type RidersWithNationAndTeam = QueryData<ReturnType<typeof ridersWithNationAndTeamQuery>>

export const getRidersFromYear = (year: number) => unstable_cache(async () => {
    const currentYear = new Date().getFullYear();
    const { data, error } = await  ridersFromYearQuery()
        .eq("year", year)
        .eq("rider_seasons.year", currentYear);

    if (error) { throw error; }

    return data as RidersFromYear;
}, ["getRidersFromYear", year.toString()], { revalidate: 60 * 60 * 24  })

const ridersFromYearQuery = () => supabase
    .from("riders")
    .select(`
        *,
        nations (*),
        rider_seasons (*)
    `)

export type RidersFromYear = QueryData<ReturnType<typeof ridersFromYearQuery>>;

export const getActiveRiderPointsLookup = unstable_cache(async () => {
    const { data, error } = await supabase
        .from("riders")
        .select("id, points, active")
        .eq("active", true);

    if (error) { throw error; }

    return data as ActiveRiderPointsLookup;
}, ["activeRiderPointsLookup"], { revalidate: 60 * 60 * 24  });

export type ActiveRiderPointsLookup = {
    id: number;
    points: number;
    active: boolean;
}[];