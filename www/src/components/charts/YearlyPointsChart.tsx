"use client";

import { connectDataNulls } from "@/lib/helpers/chartDataHelper";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { Bar, BarChart, Brush, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import ChartTooltip from "./ChartTooltip";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { sortGroupedResults } from "@/lib/helpers/results";
import ResultNameListItem from "../ResultNameListItem";
import { getGroupedResultName } from "@/lib/helpers/resultNames";

type YearlyPointsAndResults = {
    key: number,
    points: number,
    results: (Tables<"results"> & {
        points: number;
        races: Tables<"races"> & {
            meta_races: Tables<"meta_races">
        };
        results: (Tables<"results"> & { 
            points: number,
            races: Tables<"races"> & {
                meta_races: Tables<"meta_races">
            }
        })[]
    })[]
}[]

export default function YearlyPointsChart({
    yearlyPointsAndResults,
    isDistinctPlacements = false
}: Readonly<{
    yearlyPointsAndResults: YearlyPointsAndResults,
    isDistinctPlacements?: boolean
}>) {
    const t = useTranslations("chartTooltips");
    const tResultNames = useTranslations("getResultNames");

    const data = connectDataNulls(yearlyPointsAndResults.sort((a, b) => a.key - b.key), "key", "points")

    const CustomToolTip = ({ active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <ChartTooltip>
                    <p className="font-semibold">{t("year")}: {label}</p>
                    <p className="mb-2">{t("yearlyPoints")}: {formatNumber(parseInt(payload[0].value?.toString() ?? "-"))}</p>
                    {sortGroupedResults(payload[0].payload.results as YearlyPointsAndResults[number]["results"])
                        .map(result => (
                            <ul key={result.id}>
                                <ResultNameListItem
                                    resultName={getGroupedResultName(result, tResultNames, isDistinctPlacements)}
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
            <BarChart data={data}>
                <CartesianGrid strokeOpacity={0.5}/>
                <XAxis dataKey="key" tick={{fill: "#fff"}}/>
                <YAxis 
                    label={{ 
                        value: t("points"), 
                        angle: -90, 
                        position: "insideLeft", 
                        offset: 1
                    }}  
                    tick={{fill: "#fff"}} 
                    type="number"
                />
                <Bar  dataKey="points" fill="#fee402"/>
                <Brush dataKey="key"/>
                <Tooltip cursor={{fill: "#808080"}} content={<CustomToolTip />} wrapperStyle={{ zIndex: 1000 }}/>
            </BarChart>
        </ResponsiveContainer>
    )
}