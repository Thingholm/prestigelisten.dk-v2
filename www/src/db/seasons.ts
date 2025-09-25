import { supabase } from "@/utils/supabase/client"
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getGreatestSeasons = unstable_cache(async () => {
    const { data, error } = await greatestSeasonsQuery;

    if (error) { throw error; }

    return data;
}, ["greatestSeasons"], { revalidate: 60 * 60 });

const greatestSeasonsQuery = supabase
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        ),
        results (
            *,
            result_types (
                *
            ),
            races (
                *,
                race_classes (
                    *
                ),
                meta_races (
                    *
                )
            )
        )  
    `)
    .not('points_for_year', 'is', null)
    .order("points_for_year", { ascending: false })
    .limit(15);
    
export const getAllGreatestSeasons = unstable_cache(async () => {
    const { data, error } = await allGreatestSeasonsQuery;

    if (error) { throw error; }

    return data as GreatestSeasons;
}, ["allGreatestSeasons"], { revalidate: 1 });

const allGreatestSeasonsQuery = supabase
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        ),
        results (
            *
        )
    `)
    .not('points_for_year', 'is', null)
    .order("points_for_year", { ascending: false })
    .gte("points_for_year", 100);

export type GreatestSeasons = QueryData<typeof allGreatestSeasonsQuery>;

    
export const getTop10AlltimeEachSeason = unstable_cache(async () => {
    const { data, error } = await greatestTop10AlltimeEachSeasonQuery;

    if (error) { throw error; }

    return data;
}, ["top10AlltimeEachSeason"], { revalidate: 60 * 60 })

const greatestTop10AlltimeEachSeasonQuery = supabase
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        )
    `)
    .lte("rank_all_time", 10)
    .gte("year", new Date().getFullYear() - 10);

export type Top10AlltimeEachSeason = QueryData<typeof greatestTop10AlltimeEachSeasonQuery>;

export const getAllRiderSeasonsFromYear = async (year: number) => await unstable_cache(async () => {
    const { data, error } = await  allRiderSeasonsFromYearQuery().eq("year", year);

    if (error) { throw error; }

    return data as RiderSeasonsFromYear;
}, ["allRiderSeasonsFromYear", year.toString()], { revalidate: 60 * 60 })()

const allRiderSeasonsFromYearQuery = () => supabase
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        )
    `)

export type RiderSeasonsFromYear = QueryData<ReturnType<typeof allRiderSeasonsFromYearQuery>>;

export const getAllNationSeasonsFromYear = async (year: number) => await unstable_cache(async () => {
    const { data, error } = await  allNationSeasonsFromYearQuery().eq("year", year);

    if (error) { throw error; }

    return data as NationSeasonsFromYear;
}, ["allNationSeasonsFromYear", year.toString()], { revalidate: 60 * 60 })()

const allNationSeasonsFromYearQuery = () => supabase
    .from("nation_seasons")
    .select(`
        *,
        nations (
            *
        )
    `)

export type NationSeasonsFromYear = QueryData<ReturnType<typeof allNationSeasonsFromYearQuery>>; 