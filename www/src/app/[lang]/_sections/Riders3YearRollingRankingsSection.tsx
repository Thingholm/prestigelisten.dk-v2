import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Riders3YearRollingRankings } from "@/db/riders3YearRollingRankings";
import { getRiders3YearRollingRankingsUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import Riders3YearRollingRankingsTable from "../_tables/Riders3YearRollingRankingsTable";

export default function Riders3YearRollingRankingsSection({
    riders3YearRollingRankings
}: Readonly<{
    riders3YearRollingRankings: Riders3YearRollingRankings[];
}>) {
    const t = useTranslations("homepage");

    return (
        <Section>
            <Container title={t("tableTitles.greatest3YearSpan")} href={getRiders3YearRollingRankingsUrl()}>
                <Riders3YearRollingRankingsTable riders3YearRollingRankings={riders3YearRollingRankings}/>
            </Container>
        </Section>
    )
}