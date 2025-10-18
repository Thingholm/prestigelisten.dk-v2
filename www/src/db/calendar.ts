import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getCalendar = unstable_cache(async () => {
    const { data, error } = await calendarQuery;

    if (error) { throw error; }

    return data as Calendar;
}, ["calendar"], { revalidate: 60 * 60 * 24 * 30 });

const calendarQuery = supabase
    .from("calendar")
    .select(`
        *,
        races (
            *,
            meta_races (*)
        )    
    `);

export type Calendar = QueryData<typeof calendarQuery>