import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Rider } from "@/db/rider";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Ranked } from "@/lib/helpers/rank";
import { getRidersListUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";
import RidersByNationTable from "../_table/RidersByNationTable";
import RidersByYearTable from "../_table/RidersByYearTable";

export default async function TablesSection({
    rider,
    rankedRidersByNation,
    rankedRidersByYear
}: Readonly<{
    rider: Rider,
    rankedRidersByNation: Ranked<RiderPointsWithNationAndTeam[number]>[],
    rankedRidersByYear: Ranked<RiderPointsWithNationAndTeam[number]>[]
}>) {
    const t = await getTranslations("riderPage.tables");
    const tNations = await getTranslations("nations");
    

    return (
        <Section color="gray" className="gap-x-12 flex-col lg:flex-row">
            <Container 
                title={t("greatestRidersFromNation", {nation: tNations(`${rider.nations.code}.name`) })} 
                href={getRidersListUrl({ nations: [rider.nation_id] })}
                isCard
            >
                <RidersByNationTable rider={rider} rankedRiders={rankedRidersByNation}/>
            </Container>
            <Container 
                title={t("greatestRidersFromYear", {year: rider.year ?? "-" })} 
                href={getRidersListUrl(rider.year ? { bornBeforeOrIn: rider.year, isSingleYear: true } : {})}
                isCard
            >                
                <RidersByYearTable rider={rider} rankedRiders={rankedRidersByYear}/>
            </Container>
        </Section>
    )
}
