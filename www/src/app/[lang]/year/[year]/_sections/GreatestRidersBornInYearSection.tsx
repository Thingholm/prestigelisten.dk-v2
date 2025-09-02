import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { RidersFromYear } from "@/db/riderPoints";
import { useTranslations } from "next-intl";
import GreatestRidersBornInYearTable from "../_tables/GreatestRidersBornInYearTable";

export default function GreatestRidersBornInYearSection ({
    year,
    ridersFromYear,
}: Readonly<{
    year: number
    ridersFromYear: RidersFromYear
}>) {
    const t = useTranslations("yearPage");

    return (
        <Section color="gray">
            <Container title={t("titles.greatestRidersFromYear", {year: year})} isCard>
                <GreatestRidersBornInYearTable ridersFromYear={ridersFromYear}/>
            </Container>
        </Section>
    )
}