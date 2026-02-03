import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.calendar'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page({
    params
}: Readonly<{
    params: Promise<{ locale: "en" | "da" }>
}>) {
    const { locale } = await params;    
    setRequestLocale(locale);
    const t = await getTranslations("calendarPage");

    return (
        <Section className="flex-col">
            <PageHeading>{t("title")}</PageHeading>
            <CalendarWrapper/>
        </Section>
    )
}