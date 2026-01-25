import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getPointSystem } from "@/db/pointSystem";
import { getRiders3YearRollingRankingsByEndYear } from "@/db/riders3YearRollingRankings";
import { getTranslations } from "next-intl/server";
import GreatestRidersEachSpanSection from "./_sections/GreatestRidersEachSpanSection";
import { getFirstRaceYear } from "@/db/results";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.3YearSpan'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page({
    searchParams
}: Readonly<{
    searchParams: Promise<{ spanEndYear: number }>
}>){
    const t = await getTranslations("lists.riders3YearSpans");

    let spanEndYear = (await searchParams).spanEndYear;

    if (spanEndYear < 1800 || !spanEndYear) {
        spanEndYear = new Date().getFullYear();
    }

    const riderRankingsForSpan = await getRiders3YearRollingRankingsByEndYear(spanEndYear)();
    const pointSystem = await getPointSystem();
    const firstResultYear = (await getFirstRaceYear()).min;

    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <GreatestRidersEachSpanSection 
                riderRankingsForSpan={riderRankingsForSpan} 
                pointSystem={pointSystem}
                firstResultYear={firstResultYear}
                spanEndYear={spanEndYear}
            />
        </div>
    )
}