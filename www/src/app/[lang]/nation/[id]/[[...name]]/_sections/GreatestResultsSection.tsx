import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationWithRiders } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { Race } from "@/db/race";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import GreatestResultsTable from "../_tables/GreatestResultsTable";

export default function GreatestResultsSection({
    nation,
    pointSystem,
    results
}: Readonly<{
    nation: NationWithRiders,
    pointSystem: PointSystem,
    results: (Tables<'results'> & { races: Race })[]
}>) {
    const t = useTranslations("nationPage.greatestResults");
    const tNations = useTranslations("nations");

    return (
        <Section>
            <Container title={t("title", { nation: tNations(`${nation.code}.name`) })}>
                <GreatestResultsTable
                    nation={nation}
                    pointSystem={pointSystem}
                    results={results}
                />
            </Container>
        </Section>
    )
}