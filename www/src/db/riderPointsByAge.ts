import { supabase } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import { unstable_cache } from "next/cache";

export const getRiderPointsByAge = (age: number) => unstable_cache(async () => {
    const { data, error } = await riderPointsByAgeQuery().eq("age", age);

    if (error) { throw error; }

    return data as RiderPointsByAge[];
}, ["riderPointsByAge", age.toString()], { revalidate: 60 * 60 })

const riderPointsByAgeQuery = () => supabase
    .from("rider_points_by_age")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        )
    `)

export type RiderPointsByAge = {
    age: number;
    id: number;
    points: number;
    rider_id: number;
    year: number;
    riders: Tables<"riders"> & {
        nations: Tables<"nations">;
    };
};

export const getMinRiderAge = unstable_cache(async () => {
    const { data, error } = await minRiderAgeQuery;

    if (error) { throw error; }

    return data?.min ?? 0;
}, ["minRiderAge"], { revalidate: 60 * 60 * 24 * 365})

const minRiderAgeQuery = supabase
    .from("rider_points_by_age")
    .select("age.min()")
    .maybeSingle();

    
export const getMaxRiderAge = unstable_cache(async () => {
    const { data, error } = await maxRiderAgeQuery;

    if (error) { throw error; }

    return data?.max ?? 0;
}, ["maxRiderAge"], { revalidate: 60 * 60 * 24 * 365})

const maxRiderAgeQuery = supabase
    .from("rider_points_by_age")
    .select("age.max()")
    .maybeSingle();