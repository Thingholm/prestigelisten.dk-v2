import { supabaseServer } from "@/utils/supabase/server-static";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getGreatestSeasons = unstable_cache(async () => {
    const { data, error } = await greatestSeasonsQuery();

    if (error) { throw error; }

    return data;
}, ["greatestSeasons"], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
});

const greatestSeasonsQuery = () => supabaseServer
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (*)
        ),
        results (
            *,
            races (
                *,
                race_classes (*),
                meta_races (*)
            )
        )  
    `)
    .not('points_for_year', 'is', null)
    .order("points_for_year", { ascending: false })
    .limit(15);
    
export const getAllGreatestSeasons = unstable_cache(async () => {
    const { data, error } = await allGreatestSeasonsQuery();

    if (error) { throw error; }

    return data as GreatestSeasons;
}, ["allGreatestSeasons"], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
});

const allGreatestSeasonsQuery = () => supabaseServer
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (*)
        ),
        results (
            *,
            races (
                *,
                meta_races (*)
            )
        )
    `)
    .not('points_for_year', 'is', null)
    .order("points_for_year", { ascending: false })
    .gte("points_for_year", 150);

export type GreatestSeasons = QueryData<ReturnType<typeof allGreatestSeasonsQuery>>;

    
export const getTop10AlltimeEachSeason = unstable_cache(async () => {
    const { data, error } = await greatestTop10AlltimeEachSeasonQuery();

    if (error) { throw error; }

    return data;
}, ["top10AlltimeEachSeason"], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
})

const greatestTop10AlltimeEachSeasonQuery = () => supabaseServer
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (*)
        )
    `)
    .lte("rank_all_time", 10)
    .gte("year", new Date().getFullYear() - 10);

export type Top10AlltimeEachSeason = QueryData<ReturnType<typeof greatestTop10AlltimeEachSeasonQuery>>;

export const getAllRiderSeasonsFromYear = (year: number) => unstable_cache(async () => {
    const { data, error } = await  allRiderSeasonsFromYearQuery().eq("year", year);

    if (error) { throw error; }

    return data as RiderSeasonsFromYear;
}, ["allRiderSeasonsFromYear", year.toString()], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
})

const allRiderSeasonsFromYearQuery = () => supabaseServer
    .from("rider_seasons")
    .select(`
        *,
        riders (
            *,
            nations (*)
        )
    `)

export type RiderSeasonsFromYear = QueryData<ReturnType<typeof allRiderSeasonsFromYearQuery>>;

export const getAllNationSeasonsFromYear = (year: number) => unstable_cache(async () => {
    const { data, error } = await  allNationSeasonsFromYearQuery().eq("year", year);

    if (error) { throw error; }

    return data as NationSeasonsFromYear;
}, ["allNationSeasonsFromYear", year.toString()], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
})

const allNationSeasonsFromYearQuery = () => supabaseServer
    .from("nation_seasons")
    .select(`
        *,
        nations (*)
    `)

export type NationSeasonsFromYear = QueryData<ReturnType<typeof allNationSeasonsFromYearQuery>>; 

export const getRiderCountEachSeason = unstable_cache(async () => {
    const { data, error } = await supabaseServer.rpc('get_rider_season_counts_by_year')
;

    if (error) { throw error; }

    return data as RiderCount[];
}, ["riderCountEachSeason"], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
})

const riderCountQuery = supabaseServer.rpc('get_rider_season_counts_by_year');

export type RiderCount = QueryData<typeof riderCountQuery>[number];

export const getNationCountEachSeason = unstable_cache(async () => {
    const { data, error } = await supabaseServer.rpc('get_nation_season_counts_by_year');

    if (error) { throw error; }

    return data as NationCount[];
}, ["nationCountEachSeason"], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
})

const NationCountQuery = supabaseServer.rpc('get_nation_season_counts_by_year');

export type NationCount = QueryData<typeof NationCountQuery>[number];