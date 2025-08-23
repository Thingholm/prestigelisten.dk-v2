import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getPointSystem = unstable_cache(async () => {
    const { data, error } = await pointSystemQuery;

    if (error) { throw error; }

    return data as PointSystem;
}, ["pointSystem"], { revalidate: 60 * 60 * 24 * 30 });

const pointSystemQuery = supabase
    .from("point_system")
    .select("*");

export type PointSystem = QueryData<typeof pointSystemQuery>