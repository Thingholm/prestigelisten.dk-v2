import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationSeasonsFromYear, RiderSeasonsFromYear } from "@/db/seasons";
import { useTranslations } from "next-intl";
import AlltimeRidersForYearTable from "../_tables/AlltimeRidersForYearTable";
import AlltimeNationsForYearTable from "../_tables/AlltimeNationsForYearTable";

export default function AlltimePointsForYearSection({
    year,
    riderSeasonsFromYear,
    nationSeasonsFromYear,
}: Readonly<{
    year: number
    riderSeasonsFromYear: RiderSeasonsFromYear
    nationSeasonsFromYear: NationSeasonsFromYear
}>) {
    const t = useTranslations("yearPage");
    
    return (
        <Section className="gap-x-12 flex-col lg:flex-row">
            <Container title={t("titles.ridersRankings", {year: year})}>
                <AlltimeRidersForYearTable riderSeasonsFromYear={riderSeasonsFromYear}/>
            </Container>
            <Container title={t("titles.nationsRankings", {year: year})}>
                <AlltimeNationsForYearTable nationSeasonsFromYear={nationSeasonsFromYear}/>
            </Container>
        </Section>
    )
}