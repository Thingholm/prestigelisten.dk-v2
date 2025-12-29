import { getMinRiderAge } from "@/db/riderPointsByAge";
import { urls } from "@/lib/constants/urls";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.ageRankingNoneChosen'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function AgesPage() {
    const minAge = await getMinRiderAge();

    redirect(`${urls["listRidersAges"]}/${minAge}`)
}