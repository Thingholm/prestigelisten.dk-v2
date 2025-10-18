import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations("calendarPage");

    return (
        <Section className="flex-col">
            <PageHeading>{t("title")}</PageHeading>
            <CalendarWrapper/>
        </Section>
    )
}