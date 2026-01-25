"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { syncAllResultsAsync, syncLatestResultsAsync } from "@/lib/api/results";
import { Alert } from "./ui/alert";

export function SyncResultsButtons({
    token
}: Readonly<{
    token: string;
}>) {
    const [fetching, setFetching] = useState<"all" | "latest" | null>(null);
    const [result, setResult] = useState<{ type: "success" | "error", message: string } | null>(null);

    const revalidateSiteCache = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Failed to revalidate site cache:", error);
        }
    };

    const handleSyncAll = async () => {
        setFetching("all");
        setResult(null);
        try {
            const response = await syncAllResultsAsync(token);
            setResult({ type: "success", message: `Synkroniserede succesfuldt ${response} resultater.` });
            await revalidateSiteCache();
        } catch (error) {
            setResult({ type: "error", message: error instanceof Error ? error.message : "Der opstod en fejl" });
        } finally {
            setFetching(null);
        }
    };

    const handleSyncLatest = async () => {
        setFetching("latest");
        setResult(null);
        try {
            const response = await syncLatestResultsAsync(token);
            setResult({ type: "success", message: `Synkroniserede succesfuldt ${response} resultater.` });
            await revalidateSiteCache();
        } catch (error) {
            setResult({ type: "error", message: error instanceof Error ? error.message : "Der opstod en fejl" });
        } finally {
            setFetching(null);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={fetching !== null} variant="default">Synkronisér seneste resultater</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Er du sikker på, at du vil synkronisere seneste resultater?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Dette vil synkronisere de nyeste resultater for indeværende år uden at påvirke ældre data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annullér</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSyncLatest}>Fortsæt</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={fetching !== null} variant="default">Synkronisér alle resultater</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Er du sikker på, at du vil synkronisere alle resultater?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Dette kan tage meget lang tid, og vil resultere i kortvarig downtime for prestigelisten.dk.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annullér</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSyncAll}>Fortsæt</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            {(result || fetching) && (
                <Alert className="">
                    {fetching && <span className="text-sm">Henter data...</span>}
                    {result && (
                        <div className={`text-sm ${result.type === "success" ? "text-green-500" : "text-red-500"}`}>
                            {result.message}
                        </div>
                    )}
                </Alert>
            )}
        </div>
    );
}