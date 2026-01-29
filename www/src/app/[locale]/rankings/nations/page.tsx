import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getRidersRange, Riders } from "@/db/rider";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ListSection from "./_sections/ListSection";
import { getNationsWithTopRidersAndCount, NationWithTopRidersAndCount } from "@/db/nations";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.nationsRankings'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export type NationPointsWithRiders = (NationWithTopRidersAndCount[number] & {
    riders: Riders,
})[]

export default async function Page({
    params
}: Readonly<{
    params: Promise<{ locale: "en" | "da" }>
}>) {
    const { locale } = await params;    
    setRequestLocale(locale);
    const t = await getTranslations("lists.nations");

    let nationPoints = (await getNationsWithTopRidersAndCount()).filter(n => n.points);

    const riders = await getRidersRange(
        [...nationPoints.flatMap(n => {
            return [
                ...n.top_riders.map(r => r.rider_id!), 
                ...n.top_active_riders.map(r => r.rider_id!),
                ...n.top_inactive_riders.map(r => r.rider_id!)
            ];
        })]
    )();

    nationPoints = nationPoints.map(nation => ({
        ...nation,
        riders: riders.filter(rider => 
            nation.top_riders.some(tr => tr.rider_id == rider.id)
            || nation.top_active_riders.some(tr => tr.rider_id == rider.id)
            || nation.top_inactive_riders.some(tr => tr.rider_id == rider.id)
        ),
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