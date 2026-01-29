import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { NationWithRiders } from "@/db/nations";
import { Race } from "@/db/race";
import { getTranslations } from "next-intl/server";
import RacesTable from "../_tables/RacesTable";
import { TeamFromNation } from "@/db/team";
import TeamsTable from "../_tables/TeamsTable";

export default async function RacesAndTeamsSection({
    nation,
    races,
    teams
}: Readonly<{
    nation: NationWithRiders,
    races: Race[],
    teams: TeamFromNation[]
}>) {
    const t = await getTranslations("nationPage.racesAndTeamsTables");
    const tNations = await getTranslations("nations")

    const filteredRaces = Object.values(
        races.filter(race => race.meta_races.nation_id == nation.id).reduce((acc, race) => {
            const metaRaceId = race.meta_race_id;
            
            if (!acc[metaRaceId] || (race.results[0]?.max ?? 0) > (acc[metaRaceId].results[0]?.max ?? 0)) {
            acc[metaRaceId] = race;
            }

            return acc;
        }, {} as Record<number, typeof filteredRaces[0]>)
    ) as Race[];

    return (
        <Section color="gray" className="gap-x-12 flex-col lg:flex-row">
            <Container title={t("pointGivingRaces", { nation: tNations(`${nation.code}.name`) })} isCard>
                <RacesTable races={filteredRaces}/>
            </Container>
            <Container title={t("teamsWithPoints", { nation: tNations(`${nation.code}.name`) })} isCard>
                <TeamsTable teams={teams}/>
            </Container>
        </Section>
    )
}