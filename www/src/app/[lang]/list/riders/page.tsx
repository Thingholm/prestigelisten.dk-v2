import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { getTranslations } from "next-intl/server";
import ListSection from "./_sections/ListSection";
import { getMaxRiderBirthYear, getMinRiderBirthYear } from "@/db/rider";

export default async function RidersListPage({

}: Readonly<{

}>) {
    const t = await getTranslations("lists.riders");
    const tNations = await getTranslations("nations");

    const riderPoints = await getAllRiderPointsWithNationAndTeam();
    const minBirthYear = (await getMinRiderBirthYear()).min;
    const maxBirthYear = (await getMaxRiderBirthYear()).max;

    const nations = [...new Map(
        riderPoints.map(rp => rp.riders.nations).map(nation => [nation.id, {...nation, name: tNations(`${nation.code}.name`)}])
    ).values()].sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div>
            <Section className="pb-2!">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <ListSection 
                riderPoints={riderPoints}
                minBirthYear={minBirthYear}
                maxBirthYear={maxBirthYear}
                nations={nations}
            />
        </div>
    )
}