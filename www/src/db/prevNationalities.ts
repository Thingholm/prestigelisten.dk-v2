import { supabaseServer } from "@/utils/supabase/server-static";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const GetRidersWithPreviousNationality = (nationId: number) => unstable_cache(async () => {
    const { data, error } = await supabaseServer
        .from("previous_nationalities")
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
        .eq("nation_id", nationId);

    if (error) { throw error; }

    const filteredData = data.filter(rider => rider.riders.nation_id != nationId).map(p => ({
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
}, ["ridersWithPreviousNationality", nationId.toString()], { 
    revalidate: 60 * 60 * 24 * 7 , 
    tags: ["all"] 
});

const ridersWithPreviousNationalityQuery = supabaseServer
    .from("previous_nationalities")
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

export type PreviousNationalityData = QueryData<typeof ridersWithPreviousNationalityQuery>[number]

export const getRidersPreviousNationalities = (riderId: number) => unstable_cache(async () => {
    const { data, error } = await supabaseServer
        .from("previous_nationalities")
        .select(`
            *,
            riders (
                *
            ),
            nations (
                *
            )
        `)
        .eq("rider_id", riderId);

    if (error) { throw error; }
    
    return data;
}, ["ridersPreviousNationalities", riderId.toString()], { 
    revalidate: 60 * 60 * 24 * 7,
    tags: ["all"]
});

const ridersPreviousNationalitiesQuery = supabaseServer
    .from("previous_nationalities")
    .select(`
        *,
        riders (
            *
        ),
        nations (
            *
        )
    `);

export type RidersPreviousNationality = QueryData<typeof ridersPreviousNationalitiesQuery>[number]