import { createClient } from "../supabase/server";

export const getPointSystem = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("point_system")
        .select("*");

    if (error) { throw error; }

    return data ;
};
