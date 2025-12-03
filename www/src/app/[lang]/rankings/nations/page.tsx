import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getAllNationPointsWithRiderCount, NationPointsWithRiderCount } from "@/db/nationPoints";
import { getRidersRange, Riders } from "@/db/rider";
import { getTranslations } from "next-intl/server";
import ListSection from "./_sections/ListSection";
import TableSkeleton from "@/components/loading/TableSkeleton";

export type NationPointsWithRiders = (NationPointsWithRiderCount[number] & {
    riders: Riders,
    inactive_points: number
})[]

export default async function Page() {
    const t = await getTranslations("lists.nations");

    let nationPoints = await getAllNationPointsWithRiderCount();
      
    const allRiderIds = nationPoints.flatMap(nation => [
        nation.top_rider1_id,
        nation.top_rider2_id,
        nation.top_rider3_id,
        nation.top_active_rider1_id,
        nation.top_active_rider2_id,
        nation.top_active_rider3_id,
        nation.top_inactive_rider1_id,
        nation.top_inactive_rider2_id,
        nation.top_inactive_rider3_id,
    ].filter(x => x != null));

    const riders = await getRidersRange(allRiderIds)();

    nationPoints = nationPoints.map(nation => ({
        ...nation,
        riders: riders.filter(rider => rider.nation_id == nation.id),
    }));

    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <ListSection
                nationPoints={nationPoints as NationPointsWithRiders}
            />
        </div>
    )
}