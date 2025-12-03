import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationPointsWithRiderCount } from "@/db/nationPoints";
import { getListNationsUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import NationsTable from "../_tables/NationsTable";

export default function NationsSection({
    nationPointsWithRiderCount,
}: Readonly<{
    nationPointsWithRiderCount: NationPointsWithRiderCount;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section>
            <Container title={t("tableTitles.greatestNations")} href={getListNationsUrl()}>
                <p className="mb-2 -mt-2 opacity-50">{t("onlyActiveRiders")}</p>
                <NationsTable nationPointsWithRiderCount={nationPointsWithRiderCount} />
            </Container>
        </Section>
    )
}