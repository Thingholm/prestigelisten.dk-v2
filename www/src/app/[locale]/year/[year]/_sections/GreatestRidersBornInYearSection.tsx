import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { useTranslations } from "next-intl";
import GreatestRidersBornInYearTable from "../_tables/GreatestRidersBornInYearTable";
import { RidersFromYear } from "@/db/rider";

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