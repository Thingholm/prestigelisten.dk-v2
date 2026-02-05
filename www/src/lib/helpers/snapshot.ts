import { uploadSnapshot } from "@/app/actions/snapshot";
import { toPng } from "html-to-image";

export default function handleSnapshot(ref: React.RefObject<HTMLDivElement>, id: number, upload: boolean, locale: string) {
    if (ref.current === null) return;

    if (locale !== "en" && locale !== "da") return;

    toPng(ref.current, {
        quality: 1,
        width: 765,
        height: 400,
        backgroundColor: "#ffffff",
        pixelRatio: 1,
    }).then(async (dataUrl) => {
        if (upload) {
            const result = await uploadSnapshot(dataUrl, id, locale);
            if (result.success) {
                console.log("Upload successful:", result.fileName);
            } else {
                console.error("Upload failed:", result.error);
            }
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