import { supabaseServer } from "@/utils/supabase/server-static";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getCalendar = unstable_cache(async () => {
    const { data, error } = await calendarQuery();

    if (error) { throw error; }

    return data as Calendar;
}, ["calendar"], { revalidate: 60 * 60 * 24  * 24 * 30 });

const calendarQuery = () => supabaseServer
    .from("calendar")
    .select(`
        *,
        races (
            *,
            meta_races (
                *,
                nations (*)
            )
        )    
    `);

export type Calendar = QueryData<ReturnType<typeof calendarQuery>>