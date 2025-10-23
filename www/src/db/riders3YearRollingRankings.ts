import { supabase } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import { unstable_cache } from "next/cache";

export const getRiders3YearRollingRankings = unstable_cache(async () => {
    const { data, error } = await riders3YearRollingRankingsQuery;

    if (error) { throw error; }

    return data as unknown as Riders3YearRollingRankings[];
}, ["riders3YearRollingRankings"], { revalidate: 60 * 60 });

const riders3YearRollingRankingsQuery = supabase
    .from("riders_3_year_rolling_rankings")
    .select(`
        *,
        riders (
            *,
            nations (
                *
            )
        )    
    `)
    .lte("rank_for_3_year_span", 10)
    .gte("year", new Date().getFullYear() - 10);

export type Riders3YearRollingRankings = {
    rider_id: number;
    riders: Tables<"riders"> & {
        nations: Tables<"nations">
    }
    year: number;
    points_last_3_years: number;
    rank_for_3_year_span: number;
};

export const getRiders3YearRollingRankingsByEndYear = (endYear: number) => unstable_cache(async () => {
    const { data, error } = await riders3YearRollingRankingsByEndYearQuery().eq("year", endYear).in("riders.results.year", [endYear, endYear - 1, endYear - 2]);

    if (error) { throw error; }

    return data as unknown as Riders3YearRollingRankingsWithResults[];
}, ["riders3YearRollingRankingsByEndYear", endYear.toString()], { revalidate: 60 * 60 });

const riders3YearRollingRankingsByEndYearQuery = () => supabase
    .from("riders_3_year_rolling_rankings")
    .select(`
        *,
        riders!inner (
            *,
            nations (
                *
            ),
            results (
                *,
                races (
                    *,
                    meta_races (
                        *
                    )
                )
            )
        )    
    `)

export type Riders3YearRollingRankingsWithResults = {
    rider_id: number;
    riders: Tables<"riders"> & {
        nations: Tables<"nations">;
        results: Tables<"results"> & {
            races: Tables<"races"> & {
                meta_races: Tables<"meta_races">
            }
        }[];
    }
    year: number;
    points_last_3_years: number;
    rank_for_3_year_span: number;
};