import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.calendar'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page() {
    const t = await getTranslations("calendarPage");

    return (
        <Section className="flex-col">
            <PageHeading>{t("title")}</PageHeading>
            <CalendarWrapper/>
        </Section>
    )
}