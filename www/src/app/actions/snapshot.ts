"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadSnapshot(dataUrl: string, id: number, locale: "en" | "da") {
    const blob = await fetch(dataUrl).then(res => res.blob());
    const fileName = `${id}.png`;
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
        .from(`${locale}_twitter-images`)
        .upload(fileName, blob, {
            upsert: false,
            contentType: "image/png",
        });

    if (uploadError) {
        if (uploadError.message.includes("The resource already exists")) {
            console.log("File exists, overwriting...");
            const { error: updateError } = await supabase.storage
                .from(`${locale}_twitter-images`)
                .update(fileName, blob, {
                    contentType: "image/png",
                });

            if (updateError) {
                console.error("Update failed:", updateError);
                return { success: false, error: "Update failed" };
            }

            console.log("Uploaded new file successfully");
            return { success: true, fileName };
        }

        console.error("Upload failed:", uploadError);
        return { success: false, error: "Upload failed" };
    }

    return { success: true, fileName };
}