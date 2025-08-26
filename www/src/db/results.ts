import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllResultsFromYear = unstable_cache(async (year: number) => {    
    const { data, error } = await allResultsFromYearQuery.eq("year", year);

    if (error) { throw error; }

    return data as ResultsFromYear;
}, ["allResultsFromYear"], { revalidate: 60 * 60 })

const allResultsFromYearQuery = supabase
    .from("results")
    .select(`
        *,
        races (
            *,
            meta_races (
                *,
                nations (
                    *
                )
            )
        ),
        riders (
            *,
            nations (
                *
            )
        )
    `)

    export type ResultsFromYear = QueryData<typeof allResultsFromYearQuery>