import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getPointSystem } from "@/db/pointSystem";
import { getRiders3YearRollingRankingsByEndYear } from "@/db/riders3YearRollingRankings";
import { getTranslations } from "next-intl/server";
import GreatestRidersEachSpanSection from "./_sections/GreatestRidersEachSpanSection";
import { getFirstRaceYear } from "@/db/results";

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

    console.log(await searchParams)

    const riderRankingsForSpan = await getRiders3YearRollingRankingsByEndYear(spanEndYear);
    const pointSystem = await getPointSystem();
    const firstResultYear = (await getFirstRaceYear()).min;

    return (
        <div>
            <Section>
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