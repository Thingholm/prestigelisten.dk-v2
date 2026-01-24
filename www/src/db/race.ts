import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getRace = (raceId: number) => unstable_cache(async () => {
    const { data, error } = await raceQuery().eq("id", raceId).maybeSingle();

    if (error) { throw error; }

    return data as MetaRace;
}, ["race", raceId.toString()], { revalidate: 60 * 60 * 24  });

const raceQuery = () => supabase
    .from("meta_races")
    .select(`
        *,
        nations (*),
        races (
            *,
            race_classes (*)
        ),
        images (*)
    `)
    
export type MetaRace = QueryData<ReturnType<typeof raceQuery>>[number];

export const getRaces = unstable_cache(async () => {
    const { data, error } = await racesQuery();

    if (error) { throw error; }

    return data as Race[];
}, ["races"], { revalidate: 60 * 60 * 24  * 24 })

const racesQuery = () => supabase
    .from("races")
    .select(`
        *,
        meta_races (
            *,
            nations (
                *
            )
        ),
        race_classes (
            *
        ),
        results (
            year.max()
        )
    `)

export type Race = QueryData<ReturnType<typeof racesQuery>>[number];
