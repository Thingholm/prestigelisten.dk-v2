import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getMinRiderBirthYear = unstable_cache(async () => {
    const { data, error } = await minRiderBirthYearQuery;

    if (error) { throw error; }

    return data as MinRiderBirthYear;
}, ["minRiderBirthYear"], { revalidate: 60 * 60 * 24 * 30})

const minRiderBirthYearQuery = supabase
    .from("riders")
    .select("year.min()")
    .maybeSingle();

export type MinRiderBirthYear = QueryData<typeof minRiderBirthYearQuery>;

export const getMaxRiderBirthYear = unstable_cache(async () => {
    const { data, error } = await maxRiderBirthYearQuery;

    if (error) { throw error; }

    return data as MaxRiderBirthYear;
}, ["maxRiderBirthYear"], { revalidate: 60 * 60})

const maxRiderBirthYearQuery = supabase
    .from("riders")
    .select("year.max()")
    .maybeSingle();

export type MaxRiderBirthYear = QueryData<typeof maxRiderBirthYearQuery>;

export const getRiders = unstable_cache(async () => {
    const { data, error } = await ridersQuery;

    if (error) { throw error; }

    return data as Riders;
}, ["riders"], { revalidate: 60 * 60})

const ridersQuery = supabase
    .from("riders")
    .select(`
        *,
        nations (
            *
        )
    `)

export type Riders = QueryData<typeof ridersQuery>;

export const getRidersRange = (ids: number[]) => unstable_cache(async () => {
    const { data, error } = await ridersQuery.in("id", ids);

    if (error) { throw error; }

    return data as Riders;
}, ["ridersInRange", ids.toString()], { revalidate: 60 * 60 })();

export const getRider = (id: number) => unstable_cache(async () => {
    const { data, error } = await supabase
        .from("riders")
        .select(`
            *,
            rider_points (*),
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
            image_metadata (*)
        `)
        .eq("id", id)
        .maybeSingle();

    if (error) { throw error; }

    return data as Rider;
}, ["rider", id.toString()], { revalidate: 60 * 60 })

const riderQuery = supabase
    .from("riders")
    .select(`
        *,
        rider_points (*),
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
        image_metadata (*)
    `)

export type Rider = QueryData<typeof riderQuery>[number];