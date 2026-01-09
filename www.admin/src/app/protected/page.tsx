import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { SyncResultsButtons } from "@/components/sync-results-buttons";

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

export default  function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <Suspense fallback={
        <Alert>
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Kontrollerer forbindelse...</AlertTitle>
        </Alert>
      }>
        <ConnectionStatus />
        <SyncButtonsWrapper />
      </Suspense>
    </div>
  );
}
