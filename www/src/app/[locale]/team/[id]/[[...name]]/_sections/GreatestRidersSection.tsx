import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { TeamWithRiders } from "@/db/team";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import GreatestRidersTable from "../_tables/GreatestRidersTable";
import { ActiveRiderPointsLookup } from "@/db/rider";

export default function GreatestRidersSection({
    teamWithRiders,
    rankedActiveRiderPointsLookup
}: Readonly<{
    teamWithRiders: TeamWithRiders;
    rankedActiveRiderPointsLookup: Ranked<ActiveRiderPointsLookup[number]>[];
}>) {
    const t = useTranslations("teamPage");

    return (
        <Section>
            <Container title={t("titles.greatestRidersOnTeam", { team: teamWithRiders.name})}>
                <GreatestRidersTable
                    teamWithRiders={teamWithRiders}
                    rankedActiveRiderPointsLookup={rankedActiveRiderPointsLookup}
                />
            </Container>
        </Section>
    );
}