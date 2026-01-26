import Section from "@/components/layout/Section";
import { getPointSystem } from "@/db/pointSystem";
import { getResultsThisYear } from "@/db/results"
import { calculateRankingEvolution } from "@/lib/helpers/rankingEvolution";
import React from "react";
import LatestResultsTable from "../_tables/LatestResultsTable";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations } from "next-intl/server";
import { getAllRidersWithNationAndTeam } from "@/db/rider";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.resultsThisYear'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page(){
    const [
        t,
        results,
        riderPoints,
        pointSystem,
    ] = await Promise.all([
        getTranslations("pointGivingResultsInYear"), 
        getResultsThisYear(),
        getAllRidersWithNationAndTeam(),
        getPointSystem(),
    ])
    
    const rankingsByDate = calculateRankingEvolution(results, riderPoints, pointSystem)

    return (
        <Section className="flex-col">
            <PageHeading>{t("title", { year: new Date().getFullYear() })}</PageHeading>
            <LatestResultsTable latestResultsGroups={rankingsByDate}/>
        </Section>
    )
}