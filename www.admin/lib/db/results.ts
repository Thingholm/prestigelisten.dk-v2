import { createClient } from "../supabase/server";

export const getResultsThisYear = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase    
        .from("results")
        .select(`
            *,
            race_dates (*),
            races (
                *,
                meta_races (
                    *
                )
            ),
            riders (
                *,
                nations (*)
            )
        `)
        .not("race_date_id", "is", null)
        .eq("year", new Date().getFullYear());;

    if (error) throw error;

    return data;
};

export type ResultWithRaceDate = Awaited<ReturnType<typeof getResultsThisYear>>[number];