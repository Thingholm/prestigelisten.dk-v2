import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationWithRiders } from "@/db/nations";
import { useTranslations } from "next-intl";
import RidersTable from "../_tables/RidersTable";
import { rankBy } from "@/lib/helpers/rank";
import { Tables } from "@/utils/supabase/database.types";

export default function RidersSection({
    nation,
}: Readonly<{
    nation: Omit<NationWithRiders, "riders"> & {
        riders: (NationWithRiders["riders"][number] & {
            nations: Tables<"nations"> | null
        })[]
    }
}>) {
    const t = useTranslations("nationPage.tables");
    const tNations = useTranslations("nations");

    const riders = nation.riders.map(rider => ({
        ...rider,
        points: rider.rider_seasons[0]?.points_all_time ?? 0,
        nations: rider.nations ?? { name: nation.name, code: nation.code }
    }))

    return (
        <Section color="secondary" className="gap-x-12 flex-col lg:flex-row">
            <Container 
                title={t("greatestRiders", { nation: tNations(`${nation.code}.name`) })} 
                isCard
                dark
            >
                <RidersTable riders={rankBy(riders, "points")}/>
            </Container>            
            <Container 
                title={t("greatestActiveRiders", { nation: tNations(`${nation.code}.name`) })}
                isCard
                dark
            >
                <RidersTable riders={rankBy(riders.filter(rider => rider.active), "points")}/>
            </Container>
        </Section>
    );
}