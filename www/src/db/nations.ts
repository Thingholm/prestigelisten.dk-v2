import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getNationWithRiders = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await nationWithRidersQuery.eq("id", nationId).maybeSingle();

    if (error) { throw error; }

    return data as NationWithRiders;
}, ["nationWithRiders", nationId.toString()], { revalidate: 60 * 60 });

const nationWithRidersQuery = supabase
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

export type NationWithRiders = QueryData<typeof nationWithRidersQuery>[number]

export const getNations = unstable_cache(async () => {
    const { data, error } = await supabase
        .from("nations")
        .select("*")

    if (error) { throw error; }

    return data;
}, ["nations"], { revalidate: 60 * 60 });

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
