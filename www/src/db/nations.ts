import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getNationWithRiders = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await nationWithRidersQuery().eq("id", nationId).maybeSingle();

    if (error) { throw error; }

    return data as NationWithRiders;
}, ["nationWithRiders", nationId.toString()], { revalidate: 60 * 60 });

const nationWithRidersQuery = () => supabase
    .from("nations")
    .select(`
        *,
        riders (
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

export type NationWithRiders = QueryData<ReturnType<typeof nationWithRidersQuery>>[number]

export const getNations = unstable_cache(async () => {
    const { data, error } = await supabase
        .from("nations")
        .select("*")

    if (error) { throw error; }

    return data;
}, ["nations"], { revalidate: 60 * 60 });

export const getNationsWithTopRidersAndCount = unstable_cache(async () => {
    const { data: nationsData, error: nationsError } = await supabase
        .from("nations")
        .select("*");

    if (nationsError) { throw nationsError; }

    const { data: topRidersData, error: topRidersError } = await supabase
        .from("nation_top_3_riders")
        .select("*");
    if (topRidersError) { throw topRidersError; }

    const { data: riderCountData, error: riderCountError } = await supabase
        .from("nation_rider_counts_view")
        .select("*");

    if (riderCountError) { throw riderCountError; }

    const nationsWithTopRidersAndCount = nationsData!.map(nation => {
        const topRiders = topRidersData!.filter(rider => rider.nation_id === nation.id);
        const riderCount = riderCountData!.find(count => count.nation_id === nation.id);
        return {
            ...nation,
            top_riders: topRiders.filter(rider => rider.overall_top_3),
            top_active_riders: topRiders.filter(rider => rider.active_top_3),
            top_inactive_riders: topRiders.filter(rider => !rider.active_top_3),
            rider_count: riderCount?.total_riders || 0,
            rider_active_count: riderCount?.active_riders || 0,
            rider_inactive_count: (riderCount?.total_riders || 0) - (riderCount?.active_riders || 0) || 0,
        };
    });

    return nationsWithTopRidersAndCount;
}, ["nationsWithTopRidersAndCount"], { revalidate: 60 * 60 });

export type NationWithTopRidersAndCount = Awaited<ReturnType<typeof getNationsWithTopRidersAndCount>>;

export const getNation = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await supabase
        .from("nations")
        .select(`
            *,
            nation_seasons (
                *
            ),
            riders (
                results (
                    *
                )
            )
        `)
        .eq("id", nationId)
        .maybeSingle();

    if (error) { throw error; }

    return data as Nation;
}, ["nation", nationId.toString()], { revalidate: 60 * 60 });

const nationQuery = supabase
    .from("nations")
    .select(`
        *,
        nation_seasons (
            *
        ),
        riders (
            results (
                *
            )
        )
    `)

export type Nation = QueryData<typeof nationQuery>[number]
