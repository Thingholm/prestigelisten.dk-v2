import { createClient } from "@/utils/supabase/server";
import { toPng } from "html-to-image";

export default function handleSnapshot(ref: React.RefObject<HTMLDivElement>, id: number, upload: boolean) {
    if (ref.current === null) return;

    toPng(ref.current, {
        quality: 1,
        width: 765,
        height: 400,
        backgroundColor: "#ffffff",
        pixelRatio: 1,
    }).then(dataUrl => {
        if (upload) {
            uploadSnapshot(dataUrl, id);
        } else {
            const link = document.createElement("a");
            link.download = "snapshot.jpg";
            link.href = dataUrl;
            link.click();
        }
    }).catch(err => {
        console.error(err);
        return "error";
    });

    return "success";
}

export async function uploadSnapshot(dataUrl: string, id: number) {
    const blob = await fetch(dataUrl).then(res => res.blob());
    const fileName = `${id}.jpg`;
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
        .from("twitter-images")
        .upload(fileName, blob, {
            upsert: false,
            contentType: "image/jpg",
        });

    if (uploadError) {
        if (uploadError.message.includes("The resource already exists")) {
            console.log("File exists, overwriting...");
            const { error: updateError } = await supabase.storage
                .from("twitter-images")
                .update(fileName, blob, {
                    contentType: "image/jpg",
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