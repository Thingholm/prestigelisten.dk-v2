import { supabaseServer } from "@/utils/supabase/server-static";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllResultsFromYear = (year: number) => unstable_cache(async () => {
        const { data, error } = await allResultsFromYearQuery().eq("year", year);

        if (error) throw error;
        return data as ResultsFromYear;
    },
    ["allResultsFromYear", year.toString()], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
});

const allResultsFromYearQuery = () => supabaseServer
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

export const getResultsInRaceRange = (raceIds: number[]) => unstable_cache(async () => {
    const { data, error } = await supabaseServer
        .from("results")
        .select(`
            *
        `)
        .in("race_id", raceIds);

    if (error) throw error;
    return data as ResultsFromYear;
},
["resultsInRaceRange", raceIds.toString()], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
});

const resultsInRaceRangeQuery = () => supabaseServer
    .from("results")
    .select(`
        *
    `)

export type ResultsInRaceRange = QueryData<ReturnType<typeof resultsInRaceRangeQuery>>

export const getFirstRaceYear = unstable_cache(async () => {
    const { data, error } = await firstRaceYearQuery();

    if (error) throw error;

    return data as FirstRaceYear;
}, ["firstRaceYear"], { revalidate: 60 * 60 * 24  * 24 * 365})

const firstRaceYearQuery = () => supabaseServer
    .from("results")
    .select("year.min()")
    .maybeSingle()

export type FirstRaceYear = QueryData<ReturnType<typeof firstRaceYearQuery>>;

export const getResultsThisYear = unstable_cache(async () => {
    const { data, error } = await resultsThisYearQuery();

    if (error) throw error;

    return data as ResultWithRaceDate[];
}, ["resultsThisYear"], { 
    revalidate: 60 * 60 * 24 * 7, 
    tags: ["all"] 
});

const resultsThisYearQuery = () => supabaseServer
    .from("results")
    .select(`
        *,
        race_dates (*),
        races (
            *,
            meta_races (
                *,
                nations (*)
            )
        ),
        riders (
            *,
            nations (*)
        )
    `)
    .not("race_date_id", "is", null)
    .eq("year", new Date().getFullYear());

export type ResultWithRaceDate = QueryData<ReturnType<typeof resultsThisYearQuery>>[number];