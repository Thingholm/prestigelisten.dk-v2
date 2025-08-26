import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { ResultsFromYear } from "@/db/results";
import { RiderSeasonsFromYear } from "@/db/seasons";
import { useTranslations } from "next-intl";
import MostRiderPointsInYearTable from "./MostRiderPointsInYearTable";
import { PointSystem } from "@/db/pointSystem";

export default function MostPointsInYearSection({
    year,
    riderSeasonsFromYear,
    resultsFromYear,
    pointSystem
}: Readonly<{
    year: number
    riderSeasonsFromYear: RiderSeasonsFromYear
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const t = useTranslations("yearPage");

    return (
        <Section>
            <Container title={t("titles.riderWithMostPoints", {year: year})}>
                <MostRiderPointsInYearTable 
                    riderSeasonsFromYear={riderSeasonsFromYear} 
                    resultsFromYear={resultsFromYear}
                    pointSystem={pointSystem}
                />
            </Container>
        </Section>
    )
}