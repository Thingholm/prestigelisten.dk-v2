import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllResultsFromYear = (year: number) => unstable_cache(async () => {
        const { data, error } = await allResultsFromYearQuery().eq("year", year);

        if (error) throw error;
        return data as ResultsFromYear;
    },
    ["allResultsFromYear", year.toString()], { revalidate: 60 * 60 })();

const allResultsFromYearQuery = () => supabase
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
            ),
            race_classes (
                *
            )
        ),
        riders (
            *,
            nations (
                *
            )
        )
    `)

    export type ResultsFromYear = QueryData<ReturnType<typeof allResultsFromYearQuery>>