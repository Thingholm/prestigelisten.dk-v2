import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { PointSystem } from "@/db/pointSystem";
import { Rider } from "@/db/rider";
import { groupResults } from "@/lib/helpers/groupResults";
import { getTranslations } from "next-intl/server";
import AllResultsTable from "../_table/AllResultsTable";
import { Tables } from "@/utils/supabase/database.types";

export default async function AllResultsSection({
    rider,
    pointSystem,
    nations
}: Readonly<{
    rider: Rider,
    pointSystem: PointSystem,
    nations: Tables<"nations">[];
}>) {
    const t = await getTranslations("riderPage.allResults");

    const groupedResults = groupResults(rider.results, pointSystem, true)

    return (
        <Section>
            <Container title={t("title")}>
                <AllResultsTable 
                    groupedResults={groupedResults} 
                    nations={nations}
                    pointSystem={pointSystem}
                />
            </Container>
        </Section>
    )
}