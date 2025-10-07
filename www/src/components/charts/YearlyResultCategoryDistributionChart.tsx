"use client";

import { useTranslations } from "next-intl";
import { Bar, BarChart, Brush, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatNumber } from "@/lib/helpers/localeHelpers";

export default function YearlyResultCategoryDistributionChart({
    yearlyResultsGroupedByCategory
}: Readonly<{
    yearlyResultsGroupedByCategory: {
        key: number;
        points: number;
        championship: number;
        other: number;
        stageWin: number;
        gc: number;
        oneDayRace: number;
    }[]
}>) {
    const t = useTranslations("chartTooltips");

    const CustomToolTip = ({ active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            console.log(payload)
            return (
                <ChartTooltip>
                    <p className="font-semibold">{t("year")}: {label}</p>
                    <p className="mb-2">{t("distributionOfPointsGained")}</p>
                    {payload.map((entry, index) => (
                        <p 
                            key={index} 
                            style={{ color: (entry as {fill: string}).fill}}
                        >
                            {t(`categories.${entry.name}`)}: {formatNumber(parseFloat(payload[index].value?.toString() ?? "-"), 1)}% - {formatNumber(Math.round((payload[index].value as number) / 100 * (payload[0].payload.points as number)))}p
                        </p>
                    ))}
                </ChartTooltip>
            )
        };
    }

    return (
        <ResponsiveContainer height={400} width="100%">
            <BarChart data={yearlyResultsGroupedByCategory.sort((a, b) => a.key - b.key)}>
                <CartesianGrid strokeOpacity={0.5}/>
                <XAxis dataKey="key" tick={{fill: "#fff"}}/>
                <YAxis 
                    label={{ 
                        value: "%", 
                        angle: -90, 
                        position: "insideLeft"
                    }}  
                    tick={{fill: "#fff"}} 
                    domain={[0, 100]} 
                    allowDataOverflow 
                    type="number"
                />
                <Bar dataKey="gc" stackId={1} fill="#fee402"/>
                <Bar dataKey="stageWin" stackId={1} fill="#14ed11"/>
                <Bar dataKey="oneDayRace" stackId={1} fill="#d1062b"/>
                <Bar dataKey="championship" stackId={1} fill="#11c8ed"/>
                <Bar dataKey="other" stackId={1} fill="#fff"/>
                <Brush dataKey="key"/>
                <Tooltip cursor={{fill: "#808080"}} content={<CustomToolTip />} wrapperStyle={{ zIndex: 1000 }}/>
            </BarChart>
        </ResponsiveContainer>
    )
}