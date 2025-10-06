import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const GetRidersWithPreviousNationality = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await ridersWithPreviousNationalityQuery.eq("nation_id", nationId);

    if (error) { throw error; }

    const filteredData = data.map(p => ({
        ...p,
        riders: {
            ...p.riders,
            results: p.riders.results.filter(result => 
                result.year >= (p.start_year ?? 0) 
                && result.year <= (p.end_year ?? 9999)
            )
        }
    }));

    return filteredData as PreviousNationalityData[]
}, ["ridersWithPreviousNationality", nationId.toString()], { revalidate: 60 * 60 * 24})

const ridersWithPreviousNationalityQuery = supabase
    .from("prev_nationalities")
    .select(`
        *,
        riders (
            *,
            rider_seasons (
                *
            ),
            results (
                *
            ),
            nations (
                *
            )
        )
    `)
    .eq("riders.rider_seasons.year", new Date().getFullYear())


export type PreviousNationalityData = QueryData<typeof ridersWithPreviousNationalityQuery>[number]