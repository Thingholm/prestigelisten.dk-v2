import { GroupedByKey } from "@/lib/helpers/groupResults";
import { Ranked } from "@/lib/helpers/rank";
import { Tables } from "@/utils/supabase/database.types";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";
import MostPointsInRaceRidersTable from "../_tables/MostPointsInRaceRidersTable";
import MostPointsInRaceNationsTable from "../_tables/MostPointsInRaceNationsTable";

export default function MostPointsInRaceSection({
    groupResultsByRider,
    groupResultsByNation
}: Readonly<{
    groupResultsByRider: Ranked<GroupedByKey<Tables<"results">, Tables<"riders">>>[],
    groupResultsByNation: Ranked<GroupedByKey<Tables<"results">, Tables<"nations">>>[]
}>) {
    const t = useTranslations("racePage.titles");

    return (
        <Section className="gap-x-12 flex-col lg:flex-row" color="secondary">
            <Container
                title={t("mostPointsRiders")} 
                dark
                isCard
            >
                <MostPointsInRaceRidersTable groupResultsByRider={groupResultsByRider}/>
            </Container>
            <Container 
                title={t("mostPointsNations")}
                dark
                isCard
            >
                <MostPointsInRaceNationsTable groupResultsByNations={groupResultsByNation}/>
            </Container>
        </Section>
    )
}