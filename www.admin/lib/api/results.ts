const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function syncAllResultsAsync(token: string) {
    const response = await fetch(`${API_URL}/results/sync-all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to sync results");
    }

    return response.json();
}

export async function syncLatestResultsAsync(token: string) {
    const response = await fetch(`${API_URL}/results/sync-latest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to sync results");
    }

    return response.json();
}