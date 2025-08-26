import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getMinRiderBirthYear = unstable_cache(async () => {
    const { data, error } = await minRiderBirthYearQuery;

    if (error) { throw error; }

    return data as MinRiderBirthYear;
}, ["minRiderBirthYear"], { revalidate: 60 * 60 * 24 * 30})

const minRiderBirthYearQuery = supabase
    .from("riders")
    .select("year.min()")
    .maybeSingle();

export type MinRiderBirthYear = QueryData<typeof minRiderBirthYearQuery>;