import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations } from "next-intl/server";
import ListSection from "./_sections/ListSection";
import { getAllRidersWithNationAndTeam, getMaxRiderBirthYear, getMinRiderBirthYear } from "@/db/rider";

export default async function RidersListPage() {
    const t = await getTranslations("lists.riders");
    const tNations = await getTranslations("nations");

    const riders = await getAllRidersWithNationAndTeam();
    const minBirthYear = (await getMinRiderBirthYear()).min;
    const maxBirthYear = (await getMaxRiderBirthYear()).max;

    const nations = [...new Map(
        riders.map(r => r.nations).map(nation => [nation.id, {...nation, name: tNations(`${nation.code}.name`)}])
    ).values()].sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div>
            <Section className="pb-2!">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <ListSection 
                riders={riders}
                minBirthYear={minBirthYear}
                maxBirthYear={maxBirthYear}
                nations={nations}
            />
        </div>
    )
}