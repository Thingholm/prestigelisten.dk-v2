import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllNationPointsWithRiderCount = unstable_cache(async () => {
    const { data, error } = await nationPointsWithRiderCountQuery;
    
    if (error) { throw error; }

    return data as NationPointsWithRiderCount;
}, ["nationPointsWithRiderCount"], { revalidate: 60 * 60 });

const nationPointsWithRiderCountQuery = supabase
        .from("nation_points_with_rider_counts_view")
        .select("*")
        .order("points", { ascending: false });

export type NationPointsWithRiderCount = Array<Omit<QueryData<typeof nationPointsWithRiderCountQuery>[number], "id" | "name" | "code"> & {
    id: number;
    name: string;
    code: string;
}>;

export const getNationPoints = unstable_cache(async () => {
    const { data, error } = await nationPointsQuery;

    if (error) { throw error; }

    return data as NationPoints[];
}, ["nationPoints"], { revalidate: 60 * 60 });

const nationPointsQuery = supabase
    .from("nation_points")
    .select(`
        *,
        nations (
            *
        )    
    `);

export type NationPoints = QueryData<typeof nationPointsQuery>[number]