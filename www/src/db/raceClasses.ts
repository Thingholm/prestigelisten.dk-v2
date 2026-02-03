import { supabaseServer } from "@/utils/supabase/server-static";
import { unstable_cache } from "next/cache";

export const getRaceClasses = unstable_cache(async () => {
    const { data, error } = await raceClassesQuery();

    if (error) { throw error; }

    return data;
}, ["raceClasses"], { revalidate: 60 * 60 * 24  * 24 * 365 })

const raceClassesQuery = () => supabaseServer 
    .from("race_classes")
    .select("*")