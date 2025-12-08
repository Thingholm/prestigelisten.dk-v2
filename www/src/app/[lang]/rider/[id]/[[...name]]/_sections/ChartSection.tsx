"use client"

import ProfileChartsWrapper from "@/components/charts/ProfileChartsWrapper";
import ResultCategoryDistribution from "@/components/charts/ResultCategoryDistribution";
import YearlyAlltimeRankingsChart from "@/components/charts/YearlyAlltimeRankingsChart";
import YearlyPointsChart from "@/components/charts/YearlyPointsChart";
import YearlyRankingsChart from "@/components/charts/YearlyRankingsChart";
import YearlyResultCategoryDistributionChart from "@/components/charts/YearlyResultCategoryDistributionChart";
import Section from "@/components/layout/Section";
import { PointSystem } from "@/db/pointSystem";
import { Rider } from "@/db/rider";
import { groupResults, groupResultsByKey } from "@/lib/helpers/groupResults";
import { getResultCategory, ResultCategory } from "@/lib/helpers/resultCategory";
import { useTranslations } from "use-intl";

export default function ChartSection({
    rider,
    pointSystem
}: Readonly<{
    rider: Rider,
    pointSystem: PointSystem
}>) {
    const t = useTranslations("riderPage.charts");

    const resultsGroupedByYear = groupResultsByKey(rider.results, pointSystem, r => r.year);
    const resultsGroupedByCategory = groupResultsByKey(
            rider.results.map(result => ({
                ...result,
                category: getResultCategory(result)
            })), 
            pointSystem, 
            result => result.category
        ).map(categoryGroup => ({
            ...categoryGroup,
            percent: categoryGroup.points / (rider.rider_points[0].points ?? 1) * 100,
            results: groupResults(categoryGroup.results, pointSystem),
            count: categoryGroup.results.length
        })
    );


    const resultsGroupedByYearGroupedByResult = resultsGroupedByYear.map(group => ({...group, results: groupResults(group.results, pointSystem, true)}));
    const resultsGroupedByYearGroupedByCategory = resultsGroupedByYear.map(group => ({
        key: group.key,
        points: group.points, 
        ...Object.fromEntries(groupResultsByKey(
            group.results.map(result => ({
                ...result,
                category: getResultCategory(result) as ResultCategory
            })), 
            pointSystem, 
            result => result.category
        ).map(categoryGroup => [categoryGroup.key, categoryGroup.points]))
    })) as {
        key: number;
        points: number;
        championship: number;
        gtJerseys: number;
        stageWin: number;
        gc: number;
        oneDayRace: number;
    }[];

    const charts = [
        {
            title: t("yearlyRankings"),
            component: <YearlyRankingsChart seasons={JSON.parse(JSON.stringify(rider.rider_seasons)).filter((season: Rider["rider_seasons"][number]) => season.points_for_year)}/>
        },
        {
            title: t("yearlyRankingsAcc"),
            component: <YearlyAlltimeRankingsChart seasons={rider.rider_seasons}/>
        },
        {
            title: t("yearlyPoints"),
            component: <YearlyPointsChart yearlyPointsAndResults={resultsGroupedByYearGroupedByResult} isDistinctPlacements/>
        },
        {
            title: t("yearlyCategoryPoints"),
            component: <YearlyResultCategoryDistributionChart yearlyResultsGroupedByCategory={resultsGroupedByYearGroupedByCategory}/>
        },
        {
            title: t("categoryPoints"),
            component: <ResultCategoryDistribution resultsGroupedByCategory={resultsGroupedByCategory}/>
        }
    ]

    return (
        <Section color="secondary">
            <div className="lg:mr-3 w-full">
                <ProfileChartsWrapper
                    charts={[...charts]}
                    initialChartIndex={2}
                    key={1}
                />
            </div>
            <div className="ml-3 w-full hidden lg:block">
                <ProfileChartsWrapper 
                    charts={[...charts]}
                    initialChartIndex={1}
                    key={2}
                />
            </div>    
        </Section>
    )
}