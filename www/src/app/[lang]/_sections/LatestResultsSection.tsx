import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { PointSystem } from "@/db/pointSystem";
import { ResultWithRaceDate } from "@/db/results";
import { urls } from "@/lib/constants/urls";
import { calculateRankingEvolution } from "@/lib/helpers/rankingEvolution";
import { getTranslations } from "next-intl/server";
import LatestResultsTable from "../_tables/LatestResultsTable";
import { RidersWithNationAndTeam } from "@/db/rider";

export default async function LatestResultsSection({
    results,
    riders,
    pointSystem
}: Readonly<{
    results: ResultWithRaceDate[],
    riders: RidersWithNationAndTeam,
    pointSystem: PointSystem
}>) {
    const t = await getTranslations("homepage.tableTitles");

    const rankingEvolution = calculateRankingEvolution(results.sort((a, b) => Date.parse(b.race_dates?.date ?? "") - Date.parse(a.race_dates?.date ?? "")).slice(0, 10), riders, pointSystem).slice(0, 10);

    return (
        <Section>
            <Container title={t("latestResults")} href={urls["resultsThisYear"]}>
                <LatestResultsTable latestResultsGroups={rankingEvolution}/>
            </Container>
        </Section>
    )
}