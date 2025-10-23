"use client";

import ChartTooltip from "@/components/charts/ChartTooltip";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Rider } from "@/db/rider";
import { connectDataNulls } from "@/lib/helpers/chartDataHelper";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { getRiderName } from "@/lib/helpers/riderName";
import { useTranslations } from "next-intl";
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type RiderSeasonWithAge = Rider["rider_seasons"][number] & {
    age: number
}

type Data = {
    age: number,
    [key: number]: number
}

export default function CompareChartSection({
    rider1,
    rider2
}: Readonly<{
    rider1: Rider,
    rider2: Rider
}>) {
    const t = useTranslations("comparePage.rider");

    if (!rider1.year || !rider2.year) return null;

    const data = [
        ...connectDataNulls(
            rider1.rider_seasons
                .filter(season => season.points_for_year)
                .sort((a, b) => a.year - b.year)
                .map(season => ({...season, age: season.year - rider1.year!})), 
            "age", 
            "points_for_year"
        ),
        ...connectDataNulls(
            rider2.rider_seasons
                .filter(season => season.points_for_year)
                .sort((a, b) => a.year - b.year)
                .map(season => ({...season, age: season.year - rider2.year!})), 
            "age", 
            "points_for_year"
        ),    
    ].reduce((acc: Data[], obj: RiderSeasonWithAge) => {
        const currentAcc = acc ?? [];

        const ageIndex = currentAcc.findIndex(i => i.age == obj.age);

        if (ageIndex == -1) {
            currentAcc.push({
                age: obj.age ?? 0,
                [obj.rider_id]: obj.points_for_year ?? 0
            })
        } else {
            currentAcc[ageIndex][obj.rider_id] = obj.points_for_year ?? 0
        }

        return currentAcc
    }, []).sort((a, b) => a.age - b.age);

    const rider1MaxYear = Math.max(...rider1.rider_seasons.filter(season => season.points_for_year).map(season => season.year));
    const rider2MaxYear = Math.max(...rider2.rider_seasons.filter(season => season.points_for_year).map(season => season.year));

    const dataAlltimePoints = [
        ...connectDataNulls(
            rider1.rider_seasons
                .filter(season => season.year <= rider1MaxYear)
                .sort((a, b) => a.year - b.year)
                .map(season => ({...season, age: season.year - rider1.year!})), 
            "age", 
            "points_all_time"
        ),
        ...connectDataNulls(
            rider2.rider_seasons
                .filter(season => season.year <= rider2MaxYear)
                .sort((a, b) => a.year - b.year)
                .map(season => ({...season, age: season.year - rider2.year!})), 
            "age", 
            "points_all_time"
        ),    
    ].reduce((acc: Data[], obj: RiderSeasonWithAge) => {
        const currentAcc = acc ?? [];

        const ageIndex = currentAcc.findIndex(i => i.age == obj.age);

        if (ageIndex == -1) {
            currentAcc.push({
                age: obj.age ?? 0,
                [obj.rider_id]: obj.points_all_time ?? 0
            })
        } else {
            currentAcc[ageIndex][obj.rider_id] = obj.points_all_time ?? 0
        }

        return currentAcc
    }, []).sort((a, b) => a.age - b.age);

    const CustomToolTip = ({ active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            const rider1Season = rider1.rider_seasons.find(season => season.year == rider1.year + label);
            const rider2Season = rider2.rider_seasons.find(season => season.year == rider2.year + label);

            return (
                <ChartTooltip>
                    <p className="font-semibold text-white">{t("age")}: {label}</p>
                    <div className={`text-white mt-2 mb-1 ${rider1Season ? "" : "opacity-50"}`}>
                        <p style={{ color: "#2dc702" }}>{getRiderName(rider1)}</p>
                        <p>{t("pointsGained")}: {formatNumber(rider1Season?.points_for_year) ?? 0}</p>
                        <p>{t("pointsAllTime")}: {formatNumber(rider1Season?.points_all_time) ?? 0} </p>
                        <p>{t("placementAlltime")}: {formatNumber(rider1Season?.rank_all_time) ?? "-"}</p>
                    </div>

                    <div className={`text-white mt-2 mb-1 ${rider2Season ? "" : "opacity-50"}`}>
                        <p style={{ color: "#da291c" }}>{getRiderName(rider2)}</p>
                        <p>{t("pointsGained")}: {formatNumber(rider2Season?.points_for_year) ?? 0}</p>
                        <p>{t("pointsAllTime")}: {formatNumber(rider2Season?.points_all_time) ?? 0} </p>
                        <p>{t("placementAlltime")}: {formatNumber(rider2Season?.rank_all_time) ?? "-"}</p>                
                    </div>
                </ChartTooltip>
            )
        }
    }

    return (
        <Section className="flex-col">
            <Container title={t("agePointsTitle")} className="text-center">
                <ResponsiveContainer width="100%" height={450}>
                    <LineChart data={data}>
                        <CartesianGrid strokeOpacity={0.5}/>
                        <XAxis dataKey="age" tick={{fill: "#000"}}/>
                        <YAxis label={{ value: t("points"), angle: -90, position: "insideLeft", offset: 1}}  tick={{fill: "#000"}} type="number"/>
                        <Line type="monotone" dataKey={rider1.id} stroke="#2dc702" strokeWidth={2}/>
                        <Line type="monotone" dataKey={rider2.id} stroke="#da291c" strokeWidth={2}/>
                        <Brush dataKey="age"/>
                        <Legend verticalAlign="top" height={36} formatter={(_,__, index) => index == 0 ? getRiderName(rider1) ?? "" : getRiderName(rider2) ?? ""}/>
                        <Tooltip content={<CustomToolTip/>}/>
                    </LineChart>
                </ResponsiveContainer>
            </Container>

            <Container title={t("agePointsTitle")} className="text-center">
                <ResponsiveContainer width="100%" height={450}>
                    <LineChart data={dataAlltimePoints}>
                        <CartesianGrid strokeOpacity={0.5}/>
                        <XAxis dataKey="age" tick={{fill: "#000"}}/>
                        <YAxis label={{ value: t("points"), angle: -90, position: "insideLeft", offset: 1}}  tick={{fill: "#000"}} type="number"/>
                        <Line type="monotone" dataKey={rider1.id} stroke="#2dc702" strokeWidth={2}/>
                        <Line type="monotone" dataKey={rider2.id} stroke="#da291c" strokeWidth={2}/>
                        <Brush dataKey="age"/>
                        <Legend verticalAlign="top" height={36} formatter={(_,__, index) => index == 0 ? getRiderName(rider1) ?? "" : getRiderName(rider2) ?? ""}/>
                        <Tooltip content={<CustomToolTip/>}/>
                    </LineChart>
                </ResponsiveContainer>
            </Container>
        </Section>
    )
}