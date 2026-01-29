"use client";

import { ExpandCell, ExpandedResultsRow, RiderNameCell, TableCell, TableRow } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { ResultsFromYear } from "@/db/results";
import { RiderSeasonsFromYear } from "@/db/seasons";
import React, { useState } from "react";

export default function ExpandableRiderPointsInYearRow({
    riderSeason,
    riderResults,
    pointSystem
}: Readonly<{
    riderSeason: RiderSeasonsFromYear[number]
    riderResults: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow >
                <TableCell>{riderSeason.rank_for_year}</TableCell>
                <RiderNameCell rider={riderSeason.riders} showFlagBreakpoint="always"/>
                <TableCell>{riderSeason.points_for_year}</TableCell>
                <ExpandCell isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            </TableRow>
            {isExpanded &&
                <ExpandedResultsRow 
                    results={riderResults} 
                    pointSystem={pointSystem}
                    columns={4}
                />
            }
        </>
    )
}