import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const GetRidersWithPreviousNationality = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await ridersWithPreviousNationalityQuery.eq("nation_id", nationId);

    if (error) { throw error; }

    return data.map(p => ({
        ...p,
        riders: {
            ...p.riders,
            results: p.riders.results.filter(result => 
                result.year >= (p.start_year ?? 0) 
                && result.year <= (p.end_year ?? 9999)
            )
        }
    })) as PreviousNationalityData[]
})

const ridersWithPreviousNationalityQuery = supabase
    .from("prev_nationalities")
    .select(`
        *,
        riders!inner (
            *,
            rider_seasons (
                *
            ),
            results (
                *
            )
        )
    `)
    .eq("riders.rider_seasons.year", new Date().getFullYear())


export type PreviousNationalityData = QueryData<typeof ridersWithPreviousNationalityQuery>[number]