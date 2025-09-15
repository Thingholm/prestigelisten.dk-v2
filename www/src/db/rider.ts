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