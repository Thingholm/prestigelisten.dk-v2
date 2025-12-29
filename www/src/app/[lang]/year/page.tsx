import { getYearUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.seasonRedirectPage'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default function Page() {
    redirect(`${getYearUrl()}/${new Date().getFullYear()}`)
}