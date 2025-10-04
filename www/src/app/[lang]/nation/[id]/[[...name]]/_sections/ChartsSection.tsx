"use client";

import ProfileChartsWrapper from "@/components/charts/ProfileChartsWrapper";
import ResultCategoryDistribution from "@/components/charts/ResultCategoryDistribution";
import YearlyAlltimeRankingsChart from "@/components/charts/YearlyAlltimeRankingsChart";
import YearlyPointsChart from "@/components/charts/YearlyPointsChart";
import YearlyRankingsChart from "@/components/charts/YearlyRankingsChart";
import YearlyResultCategoryDistributionChart from "@/components/charts/YearlyResultCategoryDistributionChart";
import Section from "@/components/layout/Section";
import { NationWithRiders } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { Race } from "@/db/race";
import { groupResults, groupResultsByKey } from "@/lib/helpers/groupResults";
import { getResultCategory, ResultCategory } from "@/lib/helpers/resultCategory";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";

export default function ChartsSection({
    nation,
    races,
    pointSystem
}: Readonly<{
    nation: NationWithRiders,
    races: Race[],
    pointSystem: PointSystem
}>) {
    const t = useTranslations("nationPage.charts");
    const currentYear = new Date().getFullYear();


    const flatResults = nation.riders
        .flatMap(rider => rider.results)
        .reduce<(Tables<'results'> & { races: Race })[]>((results, result) => {
            const race = races.find(race => race.id == result.race_id);

            if (!race) return results;

            if ([12, 13, 14, 15].includes(race.race_class_id)) return results;

            return [...results, {...result, races: race}]
        }, [])


    const resultsGroupedByYear = groupResultsByKey(flatResults, pointSystem,r => r.year);
    const resultsGroupedByCategory = groupResultsByKey(
        flatResults.map(result => ({
            ...result,
            category: getResultCategory(result)
        })), 
        pointSystem, 
        result => result.category
    ).map(categoryGroup => ({
        ...categoryGroup,
        percent: categoryGroup.points / (nation.nation_seasons.find(season => season.year == currentYear)?.points_all_time ?? 1) * 100,
        results: groupResults(categoryGroup.results, pointSystem),
        count: categoryGroup.results.length
    }));

    const resultsGroupedByYearGroupedByResult = resultsGroupedByYear.map(group => ({...group, results: groupResults(group.results, pointSystem)}));
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
        ).map(categoryGroup => [categoryGroup.key, categoryGroup.points / group.points * 100]))
    })) as {
        key: number;
        points: number;
        championship: number;
        other: number;
        stageWin: number;
        gc: number;
        oneDayRace: number;
    }[];

    const charts = [
        {
            title: t("yearlyRankings"),
            component: <YearlyRankingsChart seasons={nation.nation_seasons}/>
        },
        {
            title: t("yearlyPoints"),
            component: <YearlyPointsChart yearlyPointsAndResults={resultsGroupedByYearGroupedByResult}/>
        },
        {
            title: t("yearlyRankingsAcc"),
            component: <YearlyAlltimeRankingsChart seasons={nation.nation_seasons}/>
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
                    initialChartIndex={1}
                    key={1}
                />
            </div>
            <div className="ml-3 w-full hidden lg:block">
                <ProfileChartsWrapper 
                    charts={[...charts]}
                    initialChartIndex={2}
                    key={2}
                />
            </div>        
        </Section>
    )
}