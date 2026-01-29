import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { PointSystem } from "@/db/pointSystem";
import { TeamWithRiders } from "@/db/team";
import { useTranslations } from "next-intl";
import ResultsForYearTable from "../_tables/ResultsForYearTable";
import { getResultPoints } from "@/lib/helpers/pointSystem";

export default function ResultsForYearSection({
    currentYear,
    teamWithRiders,
    pointSystem
}: Readonly<{
    currentYear: number
    teamWithRiders: TeamWithRiders
    pointSystem: PointSystem
}>) {
    const t = useTranslations("teamPage");

    const resultsWithPoints = teamWithRiders.riders.flatMap(rider => rider.results.map(result => ({
        ...result,
        points: getResultPoints(result, pointSystem),
        riders: {
            ...rider,
            results: []
        }
    })));

    return (
        <Section>
            <Container title={t("titles.resultsThisYear", { year: currentYear })}>
                <ResultsForYearTable resultsWithPoints={resultsWithPoints} />
            </Container>
        </Section>
    );
}

