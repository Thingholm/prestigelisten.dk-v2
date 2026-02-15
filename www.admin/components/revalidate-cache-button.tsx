import { useState } from "react";
import { Button } from "./ui/button";

export default function RevalidateCacheButton({
    token,
}: Readonly<{
    token: string;
}>) {
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState<{ type: "success" | "error", message: string } | null>(null);


    const revalidateSiteCache = async () => {
        setFetching(true);
        setResult(null);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setResult({ type: "success", message: `Revaliderede cache succesfuldt` });
        } catch (error) {
            setResult({ type: "error", message: error instanceof Error ? error.message : "Der opstod en fejl" });
        } finally {
            setFetching(false);
        }
    };

    return (
        <Button 
            disabled={fetching === true} 
            variant="default"
            onClick={revalidateSiteCache}
        >
            Revalidér prestigelisten.dk cache
        </Button>
    )

}