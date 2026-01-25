import { SyncResultsButtons } from "@/components/sync-results-buttons";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { redirect } from "next/dist/client/components/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

async function checkConnection() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(`${apiUrl}/health`, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 }
    });

    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

async function ConnectionStatus() {
  const isConnected = await checkConnection();

  if (!isConnected) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Kan ikke forbinde til serveren.</AlertTitle>
      </Alert>
    );
  }

  return (
    <Alert variant="default">
      <CheckCircle2Icon />
      <AlertTitle>Forbundet til serveren</AlertTitle>
    </Alert>
  );
}

async function SyncButtonsWrapper() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const token = session.access_token;

  return <SyncResultsButtons token={token} />;
}

export default function Page() {
    return (
        <div className="flex flex-col gap-4">
            <Suspense fallback={
                <Alert>
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>Kontrollerer forbindelse...</AlertTitle>
                </Alert>
            }>
                <ConnectionStatus />
                <Separator />
                <SyncButtonsWrapper />
            </Suspense>
        </div>
    )
}