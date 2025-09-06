import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { TeamsWithRiders } from "@/db/team";
import { useTranslations } from "next-intl";
import TeamsTable from "../_tables/TeamsTable";

export type TeamsWithPoints = TeamsWithRiders[number] & {
    pointsForYear: number;
    pointsAllTime: number;
};

export default function TeamsTablesSection({
    teamsWithPoints,
}: Readonly<{
    teamsWithPoints: TeamsWithPoints[]
}>) {
    const t = useTranslations("teamsPage");

    return (
        <Section className="gap-x-12 flex-col lg:flex-row">
            <Container title={t("titles.greatestRiders")}>
                <TeamsTable teamsWithPoints={teamsWithPoints} rankKey="pointsAllTime" />
            </Container>
            <Container title={t("titles.mostPoints", { year: new Date().getFullYear() })}>
                <TeamsTable teamsWithPoints={teamsWithPoints} rankKey="pointsForYear" />
            </Container>
        </Section>
    )
}