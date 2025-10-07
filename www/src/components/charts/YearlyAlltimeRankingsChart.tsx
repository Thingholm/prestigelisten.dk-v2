"use client";

import { connectDataNulls } from "@/lib/helpers/chartDataHelper";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatNumber } from "@/lib/helpers/localeHelpers";

export default function YearlyAlltimeRankingsChart({
    seasons
}: Readonly<{
    seasons: (Tables<"nation_seasons"> | Tables<"rider_seasons">)[]
}>) {
    const t = useTranslations("chartTooltips");

    const data = connectDataNulls(seasons.sort((a, b) => a.year - b.year), "year", "rank_for_year")

    const CustomToolTip = ({ active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <ChartTooltip>
                    <p className="font-semibold mb-2">{t("year")}: {label}</p>
                    <p>{t("placement")}: {formatNumber(parseInt(payload[0].value?.toString() ?? "-"))}</p>
                    <p>{t("points")}: {formatNumber(payload[0].payload.points_all_time)}</p>
                </ChartTooltip>
            )
        };
    }

    return (
        <ResponsiveContainer height={400} width="100%">
            <LineChart data={data}>
                <CartesianGrid strokeOpacity={0.5}/>
                <XAxis dataKey="year" tick={{fill: "#fff"}}/>
                <YAxis 
                    reversed 
                    label={{ value: t("placement"), angle: -90, position: "insideLeft", offset: 1}}  
                    tick={{fill: "#fff"}} 
                    type="number" 
                    domain={[1, (dataMin: number) => (Math.round(dataMin * 1.05))]} 
                    interval={"preserveStart"}
                />
                <Line 
                    type="monotone" 
                    dataKey="rank_all_time" 
                    stroke="#fee402" 
                    // dot={<Dot r={2} fill="#fee402"/>}
                    dot={false}
                />
                <Brush dataKey="year"/>
                <Tooltip content={<CustomToolTip />} wrapperStyle={{ zIndex: 1000 }}/>
            </LineChart>
        </ResponsiveContainer>
    )
}