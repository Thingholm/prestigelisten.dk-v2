import { getYearUrl } from "@/lib/helpers/urls";
import { redirect } from "next/navigation";

export default function Page() {
    redirect(`${getYearUrl()}/${new Date().getFullYear()}`)
}