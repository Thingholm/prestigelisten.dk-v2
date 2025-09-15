import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { getTranslations } from "next-intl/server";
import ListSection from "./_sections/ListSection";

export default async function RidersListPage({

}: Readonly<{

}>) {
    const t = await getTranslations("lists.riders");

    const riderPoints = await getAllRiderPointsWithNationAndTeam();

    return (
        <div>
            <Section className="pb-2!">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <ListSection riderPoints={riderPoints}/>
        </div>
    )
}