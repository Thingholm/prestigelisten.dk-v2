import { createClient } from "@/utils/supabase/server";
import { toJpeg, toPng } from "html-to-image";

export default function handleSnapshot(ref: React.RefObject<HTMLDivElement>, id: number, upload: boolean, locale: string) {
    if (ref.current === null) return;

    if (locale !== "en" && locale !== "da") return;

    toPng(ref.current, {
        quality: 1,
        width: 765,
        height: 400,
        backgroundColor: "#ffffff",
        pixelRatio: 1,
    }).then(dataUrl => {
        if (upload) {
            uploadSnapshot(dataUrl, id, locale);
        } else {
            const link = document.createElement("a");
            link.download = "snapshot.png";
            link.href = dataUrl;
            link.click();
        }
    }).catch(err => {
        console.error(err);
        return "error";
    });

    return "success";
}

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
                return "error";
            }

            console.log("Uploaded new file successfully");
            return fileName;
        }

        console.error("Upload failed:", uploadError);
        return "error";
    }
}