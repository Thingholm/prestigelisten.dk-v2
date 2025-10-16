import Section from "@/components/layout/Section";
import { getPointSystem } from "@/db/pointSystem";
import { getResultsThisYear } from "@/db/results"
import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { calculateRankingEvolution } from "@/lib/helpers/rankingEvolution";
import React from "react";
import LatestResultsTable from "../_tables/LatestResultsTable";
import PageHeading from "@/components/ui/PageHeading";
import { getTranslations } from "next-intl/server";

export default async function Page(){
    const t = await getTranslations("pointGivingResultsInYear");

    const results = await getResultsThisYear();
    const riderPoints = await getAllRiderPointsWithNationAndTeam();
    const pointSystem = await getPointSystem();
    
    const rankingsByDate = calculateRankingEvolution(results, riderPoints, pointSystem)

    return (
        <Section className="flex-col">
            <PageHeading>{t("title", { year: new Date().getFullYear() })}</PageHeading>
            <LatestResultsTable latestResultsGroups={rankingsByDate}/>
        </Section>
    )
}