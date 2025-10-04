"use client";

import { formatNumber } from "@/lib/helpers/localeHelpers";
import { ResultCategory } from "@/lib/helpers/resultCategory";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { PieChart, ResponsiveContainer, Pie, Cell, Legend, TooltipProps, Tooltip } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import ChartTooltip from "./ChartTooltip";
import { sortGroupedResults } from "@/lib/helpers/results";
import ResultNameListItem from "../ResultNameListItem";
import { getGroupedResultName } from "@/lib/helpers/resultNames";

const colors = {
    "gc": "#fee402", 
    "stageWin": "#14ed11", 
    "oneDayRace": "#d1062b", 
    "championship": "#11c8ed", 
    "other": "#fff"
}

type GroupedResults = (Tables<"results"> & { 
    points: number,
    races: Tables<"races"> & {
        meta_races: Tables<"meta_races">
    }
})[]

export default function ResultCategoryDistribution({
    resultsGroupedByCategory
}: Readonly<{
    resultsGroupedByCategory: {
        percent: number;
        key: ResultCategory;
        results: GroupedResults;
        points: number;
    }[]
}>) {
    const t = useTranslations("chartTooltips");
    const tResultNames = useTranslations("getResultNames");

    const CustomToolTip = ({ active, payload}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <ChartTooltip className="!pl-15">
                    <p className="font-semibold" style={{color: payload[0].payload.fill}}>{t("category")}: {payload[0].name}</p>
                    <p>{t("points")}: {formatNumber(payload[0].payload.points)}</p>
                    <p className="mb-2">{t("numberOfResults")}: {formatNumber(payload[0].payload.count)}</p>
                    {sortGroupedResults(payload[0].payload.results)
                            .map(result => (
                                <ul key={result.id}>
                                    <ResultNameListItem
                                        resultName={getGroupedResultName(result, tResultNames, false)}
                                        metaRace={result.races.meta_races}
                                        count={result.results.length}
                                        points={result.points}
                                    />
                                </ul>
                            ))
                        }
                </ChartTooltip>
            )
        };
    }
    return (
        <ResponsiveContainer height={400} width="100%">
            <PieChart>
                <Pie 
                    data={resultsGroupedByCategory.map(category => ({
                        ...category,
                        name: t(`categories.${category.key}`),
                    }))} 
                    dataKey="percent" 
                    label={e => formatNumber(e.percent, 1) + "%"}
                >
                    {resultsGroupedByCategory.sort((a, b) => b.points - a.points).map((entry, index) => (
                        <Cell key={index} fill={colors[entry.key]}/>
                    ))}
                </Pie>
                <Tooltip content={<CustomToolTip />}/>
                <Legend/>
            </PieChart>
        </ResponsiveContainer>
    )
}