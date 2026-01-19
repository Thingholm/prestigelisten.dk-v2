import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Suspense } from "react";

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

export default function Page() {
    return (
        <div>
            <Suspense fallback={
                <Alert>
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>Kontrollerer forbindelse...</AlertTitle>
                </Alert>
            }>
                <ConnectionStatus />
            </Suspense>
        </div>
    )
}