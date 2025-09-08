import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getRace = (raceId: number) => unstable_cache(async () => {
    const { data, error } = await raceQuery.eq("id", raceId).single();

    if (error) { throw error; }

    return data as Race;
}, ["race", raceId.toString()], { revalidate: 60 * 60 })();

const raceQuery = supabase
    .from("meta_races")
    .select(`
        *,
        nations (
            *
        ),
        races (
            *,
            race_classes (
                *
            )
        ),
        image_metadata (
            *
        )
    `)
    

export type Race = QueryData<typeof raceQuery>[number];