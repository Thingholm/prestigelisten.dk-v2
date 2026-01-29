import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { TeamsWithRiders } from "@/db/team";
import { useTranslations } from "next-intl";
import TeamsTable from "../_tables/TeamsTable";
import { Ranked } from "@/lib/helpers/rank";

export type TeamsWithPoints = TeamsWithRiders[number] & {
    pointsForYear: number;
    pointsAllTime: number;
};

export default function TeamsTablesSection({
    teamsRankedAllTime,
    teamsRankedForYear,
    teamId
}: Readonly<{
    teamId: number
    teamsRankedAllTime: Ranked<TeamsWithPoints>[]
    teamsRankedForYear: Ranked<TeamsWithPoints>[]
}>) {
    const t = useTranslations("teamsPage");

    return (
        <Section className="gap-x-12 flex-col lg:flex-row" color="secondary">
            <Container 
                title={t("titles.greatestRiders")} 
                href={{ pathname: "/team" }}
                dark
                isCard
            >
                <TeamsTable 
                    rankedTeams={teamsRankedAllTime} 
                    rankKey="pointsAllTime" 
                    teamId={teamId}
                />
            </Container>
            <Container 
                title={t("titles.mostPoints", { year: new Date().getFullYear() })} 
                href={{ pathname: "/team" }}
                dark
                isCard
            >
                <TeamsTable 
                    rankedTeams={teamsRankedForYear} 
                    rankKey="pointsForYear" 
                    teamId={teamId}
                />
            </Container>
        </Section>
    )
}