import { getTranslations } from "next-intl/server";
import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.about'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page() {
    const t = await getTranslations("omPrestigelisten");

    return (
        <Section className="flex-col text-justify">
            <PageHeading>{t("title")}</PageHeading>
            <p className="mt-4">{t("description1")}</p>
            <p>{t("description2")}</p>
            <p>{t("description3")}</p>
            <p>{t("description4")}</p>
            <p>{t("description5")}</p>
            <p>{t("description6")}</p>
            <p>{t("description7")}</p>
            <p>{t("description8")}</p>
        </Section>
    )
}