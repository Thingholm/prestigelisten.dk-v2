import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { PointSystem } from "@/db/pointSystem";
import { GreatestSeasons } from "@/db/seasons";
import { getGreatestSeasonsUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import GreatestSeasonsTable from "../_tables/GreatestSeasonsTable";

export default function GreatestSeasonsSection({
    greatestSeasons,
    pointSystem,
}: Readonly<{
    greatestSeasons: GreatestSeasons;
    pointSystem: PointSystem;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section color="gray">
            <Container 
                title={t("tableTitles.greatestSeasons")} 
                href={getGreatestSeasonsUrl()}
                isCard
            >
                <GreatestSeasonsTable greatestSeasons={greatestSeasons} pointSystem={pointSystem} />
            </Container> 
        </Section>
    )
}