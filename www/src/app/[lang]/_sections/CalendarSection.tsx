import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { getTranslations } from "next-intl/server";

export default async function CalendarSection() {
    const t = await getTranslations("homepage.tableTitles")

    return (
        <Section>
            <Container title={t("calendar")}>
                <CalendarWrapper />
            </Container>
        </Section>
    )
}