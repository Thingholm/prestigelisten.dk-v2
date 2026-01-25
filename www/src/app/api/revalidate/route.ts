import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.split(" ")[1];

        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const role = user.app_metadata?.role

        if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        revalidatePath('/', "layout");
        revalidateTag("all");

        return NextResponse.json({ revalidated: true })
    } catch (error) {
        return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
    }
}