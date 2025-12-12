import { getMinRiderAge } from "@/db/riderPointsByAge";
import { urls } from "@/lib/constants/urls";
import { redirect } from "next/navigation";

export default async function AgesPage() {
    const minAge = await getMinRiderAge();

    redirect(`${urls["listRidersAges"]}/${minAge}`)
}