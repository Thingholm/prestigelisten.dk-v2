"use client";

import ChartTooltip from "@/components/charts/ChartTooltip";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Nation } from "@/db/nations";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { useTranslations } from "next-intl";
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type Data = {
    year: number,
    [key: number]: number
}

export default function CompareChartSection({
    nation1,
    nation2
}: Readonly<{
    nation1: Nation
    nation2: Nation
}>) {
    const t = useTranslations("comparePage.nation")
    const tNations = useTranslations("nations")

    const allTimeData = [
        ...nation1.nation_seasons.sort((a, b) => a.year - b.year),
        ...nation2.nation_seasons.sort((a, b) => a.year - b.year)
    ].reduce((acc: Data[], obj: Nation["nation_seasons"][number]) => {
        const currentAcc = acc ?? [];

        const yearIndex = currentAcc.findIndex(i => i.year == obj.year);

        if (yearIndex == -1) {
            currentAcc.push({
                year: obj.year ?? 0,
                [obj.nation_id]: obj.rank_all_time ?? 0
            })
        } else {
            currentAcc[yearIndex][obj.nation_id] = obj.rank_all_time ?? 0
        }

        return currentAcc
    }, []).sort((a, b) => a.year - b.year)

    const yearlyData = [
        ...nation1.nation_seasons.sort((a, b) => a.year - b.year),
        ...nation2.nation_seasons.sort((a, b) => a.year - b.year)
    ].reduce((acc: Data[], obj: Nation["nation_seasons"][number]) => {
        const currentAcc = acc ?? [];

        const yearIndex = currentAcc.findIndex(i => i.year == obj.year);

        if (yearIndex == -1) {
            currentAcc.push({
                year: obj.year ?? 0,
                [obj.nation_id]: obj.points_for_year ?? 0
            })
        } else {
            currentAcc[yearIndex][obj.nation_id] = obj.points_for_year ?? 0
        }

        return currentAcc
    }, []).sort((a, b) => a.year - b.year)

    const CustomToolTip = ({ active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            const nation1Season = nation1.nation_seasons.find(season => season.year == label);
            const nation2Season = nation2.nation_seasons.find(season => season.year == label);

            return (
                <ChartTooltip>
                    <p className="font-semibold text-white">{t("year")}: {label}</p>
                    <div className={`text-white mt-2 mb-1 ${nation1Season ? "" : "opacity-50"}`}>
                        <p style={{ color: "#2dc702" }}>{tNations(`${nation1.code}.name`)}</p>
                        <p>{t("pointsGained")}: {formatNumber(nation1Season?.points_for_year) ?? 0}</p>
                        <p>{t("pointsAllTime")}: {formatNumber(nation1Season?.points_all_time) ?? 0} </p>
                        <p>{t("placementForYear")}: {formatNumber(nation1Season?.rank_for_year) ?? "-"} </p>
                        <p>{t("placement")}: {formatNumber(nation1Season?.rank_all_time) ?? "-"}</p>
                    </div>

                    <div className={`text-white mt-2 mb-1 ${nation2Season ? "" : "opacity-50"}`}>
                        <p style={{ color: "#da291c" }}>{tNations(`${nation2.code}.name`)}</p>
                        <p>{t("pointsGained")}: {formatNumber(nation2Season?.points_for_year) ?? 0}</p>
                        <p>{t("pointsAllTime")}: {formatNumber(nation2Season?.points_all_time) ?? 0} </p>
                        <p>{t("placementForYear")}: {formatNumber(nation2Season?.rank_for_year) ?? "-"} </p>
                        <p>{t("placement")}: {formatNumber(nation2Season?.rank_all_time) ?? "-"}</p>                
                    </div>
                </ChartTooltip>
            )
        }
    }

    return (
        <>
            <Section>
                <Container title={t("yearlyRankings")} className="text-center">
                    <ResponsiveContainer width="100%" height={450}>
                        <LineChart data={allTimeData}>
                            <CartesianGrid strokeOpacity={0.5}/>
                            <XAxis dataKey="year" tick={{fill: "#000"}}/>
                            <YAxis label={{ value: t("placementLabel"), angle: -90, position: "insideLeft", offset: 1}}  tick={{fill: "#000"}} type="number" reversed domain={[1, (dataMin: number) => (Math.round(dataMin * 1.05))]} interval={"preserveStart"}/>
                            <Line type="monotone" dataKey={nation1.id} stroke="#2dc702" strokeWidth={2} dot={false}/>
                            <Line type="monotone" dataKey={nation2.id} stroke="#da291c" strokeWidth={2} dot={false}/>
                            <Brush dataKey="year"/>
                            <Legend verticalAlign="top" height={36} formatter={(_,__, index) => index == 0 ? tNations(`${nation1.code}.name`) ?? "" : tNations(`${nation2.code}.name`) ?? ""}/>
                            <Tooltip content={<CustomToolTip/>}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Container>
            </Section>
            <Section>
            <Container title={t("pointsGainedEachYear")} className="text-center">
                <ResponsiveContainer width="100%" height={450}>
                    <LineChart data={yearlyData}>
                        <CartesianGrid strokeOpacity={0.5}/>
                        <XAxis dataKey="year" tick={{fill: "#000"}}/>
                        <YAxis label={{ value: t("points"), angle: -90, position: "insideLeft", offset: 1}}  tick={{fill: "#000"}} type="number"/>
                        <Line type="monotone" dataKey={nation1.id} stroke="#2dc702" strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey={nation2.id} stroke="#da291c" strokeWidth={2} dot={false}/>
                        <Brush dataKey="year"/>
                        <Legend verticalAlign="top" height={36} formatter={(_,__, index) => index == 0 ? tNations(`${nation1.code}.name`) ?? "" : tNations(`${nation2.code}.name`) ?? ""}/>
                        <Tooltip content={<CustomToolTip/>}/>
                    </LineChart>
                </ResponsiveContainer>
            </Container>
        </Section>
        </>
    )
}