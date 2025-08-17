import { createServerClient } from "@supabase/ssr";
import { Database } from "./database.types";

export async function createClient() {

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    return [];
                },
                setAll() {

                },
            },
        }
    );
}