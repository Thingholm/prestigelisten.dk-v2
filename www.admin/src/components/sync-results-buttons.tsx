"use client";

import { syncAllResultsAsync, syncLatestResultsAsync } from "@/lib/api/results";
import { useState } from "react";
import { Button } from "./ui/button";
import { AlertCircleIcon, CheckCircle2Icon, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function SyncResultsButtons({
    token
}: Readonly<{
    token: string;
}>) {
    const [fetching, setFetching] = useState<"all" | "latest" | null>(null);
    const [result, setResult] = useState<{ type: "success" | "error", message: string } | null>(null);

    const handleSyncAll = async () => {
        setFetching("all");
        setResult(null);
        try {
            const response = await syncAllResultsAsync(token);
            setResult({ type: "success", message: `Successfully synced ${response} results.` });
        } catch (error) {
            setResult({ type: "error", message: error instanceof Error ? error.message : "An error occurred" });
        } finally {
            setFetching(null);
        }
    };

    const handleSyncLatest = async () => {
        setFetching("all");
        setResult(null);
        try {
            const response = await syncLatestResultsAsync(token);
            setResult({ type: "success", message: `Successfully synced ${response} results.` });
        } catch (error) {
            setResult({ type: "error", message: error instanceof Error ? error.message : "An error occurred" });
        } finally {
            setFetching(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Button 
                onClick={handleSyncAll} 
                disabled={fetching !== null}
                variant="default"
                >
                {fetching === 'all' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Synkroniser alle resultater
                </Button>
                
                <Button 
                onClick={handleSyncLatest} 
                disabled={fetching !== null}
                variant="default"
                >
                {fetching === 'latest' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Synkroniser seneste resultater
                </Button>
            </div>

            {result && (
                <Alert variant={result.type === 'error' ? 'destructive' : 'default'}>
                {result.type === 'success' ? (
                    <CheckCircle2Icon className="h-4 w-4" />
                ) : (
                    <AlertCircleIcon className="h-4 w-4" />
                )}
                <AlertTitle>{result.type === 'success' ? 'Succes' : 'Fejl'}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}