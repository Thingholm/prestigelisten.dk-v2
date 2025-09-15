import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getResultTypes = unstable_cache(async () => {
    const { data, error } = await resultTypesQuery;

    if (error) { throw error; }

    return data as ResultTypes;
}, ["resultTypes"], { revalidate: 60 * 60 * 24 * 30 })

const resultTypesQuery = supabase
    .from("result_types")
    .select("*")

export type ResultTypes = QueryData<typeof resultTypesQuery>;