"use client";

import Section from "@/components/layout/Section";
import { NationPointsWithRiders } from "../page";
import { useState } from "react";
import { rankBy, Ranked } from "@/lib/helpers/rank";
import NationsTable from "../_tables/NationsTable";
import FilterSubsection from "./FilterSubsection";

export type NationsFilter = {
    RankBy: "points" | "rider_count" | "points_per_rider";
    FilterBy: "all" | "active" | "inactive";
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

    function filterNationPointsItem(nation: NationPointsWithRiders[number]) {
        let points = nation.points;
        let riderCount = nation.rider_count;
        let points_per_rider = nation.points_per_rider;
        let riders = [
            nation.riders.find(rider => rider.id == nation.top_rider1_id),
            nation.riders.find(rider => rider.id == nation.top_rider2_id),
            nation.riders.find(rider => rider.id == nation.top_rider3_id),
        ]

        if (filter.FilterBy == "active")
        {
            points = nation.active_points;
            riderCount = nation.active_rider_count;
            points_per_rider = nation.active_points_per_rider;
            riders = [
                nation.riders.find(rider => rider.id == nation.top_active_rider1_id),
                nation.riders.find(rider => rider.id == nation.top_active_rider2_id),
                nation.riders.find(rider => rider.id == nation.top_active_rider3_id),
            ]
        }

        if (filter.FilterBy == "inactive")
        {
            points = nation.inactive_points;
            riderCount = nation.inactive_rider_count;
            points_per_rider = nation.inactive_points_per_rider;
            riders = [
                nation.riders.find(rider => rider.id == nation.top_inactive_rider1_id),
                nation.riders.find(rider => rider.id == nation.top_inactive_rider2_id),
                nation.riders.find(rider => rider.id == nation.top_inactive_rider3_id),
            ]
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
            <NationsTable nationPoints={filteredNationPoints as Ranked<NationPointsWithRiders[number]>[]}/>
        </Section>
    )
}