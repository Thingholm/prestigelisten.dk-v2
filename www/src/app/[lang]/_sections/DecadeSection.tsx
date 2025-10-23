import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { DecadeRanking } from "@/db/decade";
import { getTranslations } from "next-intl/server";
import DecadeRankingsTable from "../_tables/DecadeRankingsTable";

export default async function DecadeSection({
    decadeRankings,
}: Readonly<{
    decadeRankings: DecadeRanking[]
}>) {
    const t = await getTranslations("homepage.tableTitles");

    return (
        <Section>
            <Container title={t("greatestByDecade")}>
                <DecadeRankingsTable decadeRankings={decadeRankings}/>
            </Container>
        </Section>
    )
}