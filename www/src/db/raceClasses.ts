import { supabase } from "@/utils/supabase/client";
import { unstable_cache } from "next/cache";

export const getRaceClasses = unstable_cache(async () => {
    const { data, error } = await raceClassesQuery();

    if (error) { throw error; }

    return data;
}, ["raceClasses"], { revalidate: 60 * 60 * 24  * 24 * 365 })

const raceClassesQuery = () => supabase
    .from("race_classes")
    .select("*")