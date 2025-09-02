import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Top10AlltimeEachSeason } from "@/db/seasons";
import { useTranslations } from "next-intl";
import TopAlltimeEachSeasonTable from "../_tables/TopAlltimeEachSeasonTable";

export default function TopAlltimeEachSeasonSection({
    top10AlltimeEachSeason
}: Readonly<{
    top10AlltimeEachSeason: Top10AlltimeEachSeason;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section>
            <Container title={t("tableTitles.greatestAlltimeEachYear")} href="#">
                <TopAlltimeEachSeasonTable top10AlltimeEachSeason={top10AlltimeEachSeason} />
            </Container>
        </Section>
    )
}