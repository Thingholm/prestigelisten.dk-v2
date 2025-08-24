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
    
export type GreatestSeasons = QueryData<typeof greatestSeasonsQuery>;

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