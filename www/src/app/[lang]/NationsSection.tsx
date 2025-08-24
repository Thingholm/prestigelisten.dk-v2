import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationPointsWithRiderCount } from "@/db/nationPoints";
import { getListNationsUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import NationsTable from "./(tables)/NationsTable";

export default function NationsSection({
    nationPointsWithRiderCount,
}: Readonly<{
    nationPointsWithRiderCount: NationPointsWithRiderCount;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section>
            <Container title={t("tableTitles.greatestNations")} href={getListNationsUrl()}>
                <NationsTable nationPointsWithRiderCount={nationPointsWithRiderCount} />
            </Container>
        </Section>
    )
}