import { supabase } from "@/utils/supabase/client";
import { unstable_cache } from "next/cache";

export const getDecadeRankings = unstable_cache(async () => {
    const { data, error } = await decadeRankingsQuery();

    if (error) { throw error; }

    return data as unknown as DecadeRanking[];
}, ["decadeRankings"], { revalidate: 60 * 60 * 24  * 24 });

const decadeRankingsQuery = () => supabase
    .from("rider_decade_rankings")
    .select("*")
    .lte("rank", 10)

export type DecadeRanking = {
    decade_start: number,
    rider_id: number,
    first_name: string | null,
    last_name: string,
    nation_id: number,
    nation_code: string,
    points: number,
    rank: number
};