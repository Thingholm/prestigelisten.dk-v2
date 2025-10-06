import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getNationWithRiders = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await nationWithRidersQuery.eq("id", nationId).single();

    if (error) { throw error; }

    return data as NationWithRiders;
}, ["nationWithRiders", nationId.toString()], { revalidate: 60 * 60 });

const nationWithRidersQuery = supabase
    .from("nations")
    .select(`
        *,
        riders!inner (
            *,
            rider_seasons (
                *
            ),
            results (
                *
            )
        ),
        meta_races (
            *
        ),
        nation_seasons (
            *
        )
    `)
    .eq("riders.rider_seasons.year", new Date().getFullYear())

export type NationWithRiders = QueryData<typeof nationWithRidersQuery>[number]