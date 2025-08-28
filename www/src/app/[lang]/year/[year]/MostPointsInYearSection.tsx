import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { ResultsFromYear } from "@/db/results";
import { NationSeasonsFromYear, RiderSeasonsFromYear } from "@/db/seasons";
import { useTranslations } from "next-intl";
import MostRiderPointsInYearTable from "./MostRiderPointsInYearTable";
import { PointSystem } from "@/db/pointSystem";
import MostNationPointsInYearTable from "./MostNationPointsInYearTable";

export default function MostPointsInYearSection({
    year,
    riderSeasonsFromYear,
    nationSeasonsFromYear,
    resultsFromYear,
    pointSystem
}: Readonly<{
    year: number
    riderSeasonsFromYear: RiderSeasonsFromYear
    nationSeasonsFromYear: NationSeasonsFromYear
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const t = useTranslations("yearPage");

    return (
        <Section className="gap-x-12">
            <Container title={t("titles.riderWithMostPoints", {year: year})}>
                <MostRiderPointsInYearTable 
                    riderSeasonsFromYear={riderSeasonsFromYear} 
                    resultsFromYear={resultsFromYear}
                    pointSystem={pointSystem}
                />
            </Container>
            <Container title={t("titles.nationWithMostPoints", {year: year})}>
                <MostNationPointsInYearTable 
                    nationSeasonsFromYear={nationSeasonsFromYear} 
                    resultsFromYear={resultsFromYear}
                    pointSystem={pointSystem}
                />
            </Container>
        </Section>
    )
}