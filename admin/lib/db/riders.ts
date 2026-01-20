import { createClient } from "../supabase/server"

export const getRiders = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("riders")
        .select("*")
        .order("points", { ascending: false });

    if (error) { throw error; }

    return data;
}

export const getRiderById = async (id: number) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("riders")
        .select(`
            *,
            results (
                *,
                races (
                    *,
                    meta_races (
                        *,
                        nations (code)
                    )
                )
            ),
            nations (*),
            teams (*),
            rider_seasons (*),
            images (*)
        `)
        .eq("id", id)
        .maybeSingle();

    if (error) { throw error; }

    return data;
}

export type Rider = Awaited<ReturnType<typeof getRiderById>>;