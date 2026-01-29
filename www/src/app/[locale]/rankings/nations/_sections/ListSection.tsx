"use client";

import Section from "@/components/layout/Section";
import { NationPointsWithRiders } from "../page";
import { useState } from "react";
import { rankBy, Ranked } from "@/lib/helpers/rank";
import NationsTable from "../_tables/NationsTable";
import FilterSubsection from "./FilterSubsection";
import { toDecimals } from "@/lib/helpers/number";

export type NationsFilter = {
    RankBy: "points" | "rider_count" | "points_per_rider";
    FilterBy: "all" | "active" | "inactive";
}

export type NationPointsWithRidersAndCount = NationPointsWithRiders[number] & {
    points_per_rider: number
}

export default function ListSection({
    nationPoints
}: Readonly<{
    nationPoints: NationPointsWithRiders
}>) {
    const defaultFilter: NationsFilter = {
        RankBy: "points",
        FilterBy: "all"
    }

    const [filter, setFilter] = useState(defaultFilter);

    const filteredNationPoints = rankBy(
        nationPoints.map(nation => filterNationPointsItem(nation)),
        filter.RankBy
    );

    function filterNationPointsItem(nation: NationPointsWithRiders[number]): NationPointsWithRidersAndCount {
        let points = nation.points;
        let riderCount = nation.rider_count;
        let points_per_rider = toDecimals(riderCount > 0 ? (points / riderCount) : 0, 1);
        let riders = nation.riders.filter(r => nation.top_riders.some(tr => tr.rider_id == r.id));

        if (filter.FilterBy == "active")
        {
            points = nation.active_points;
            riderCount = nation.rider_active_count;
            points_per_rider = toDecimals(riderCount > 0 ? (points / riderCount) : 0, 1);
            riders = nation.riders.filter(r => nation.top_active_riders.some(tr => tr.rider_id == r.id));
        }

        if (filter.FilterBy == "inactive")
        {
            points = nation.points - nation.active_points;
            riderCount = nation.rider_count - nation.rider_active_count;
            points_per_rider = toDecimals(riderCount > 0 ? (points / riderCount) : 0, 1);
            riders = nation.riders.filter(r => nation.top_inactive_riders.some(tr => tr.rider_id == r.id));
        }

        return {
            ...nation,
            points: points ?? 0,
            rider_count: riderCount ?? 0,
            points_per_rider: points_per_rider ?? 0,
            riders: riders.filter(rider => rider != null)
        }
    }

    return (
        <Section className="flex-col">
            <FilterSubsection filter={filter} setFilter={setFilter}/>
            <NationsTable nationPoints={filteredNationPoints as Ranked<NationPointsWithRidersAndCount>[]}/>
        </Section>
    )
}