"use client";

import { ExpandCell, ExpandedResultsRow, NationNameCell, RiderNameCell, TableCell, TableRow } from "@/components/table";
import { Result } from "@/components/table/ExpandedResultsRow";
import { PointSystem } from "@/db/pointSystem";
import { Riders3YearRollingRankingsWithResults } from "@/db/riders3YearRollingRankings";
import { useState } from "react";

export default function ExpandableRidersEachSpanRow({
    riderRankingForSpan,
    pointSystem
}: Readonly<{
    riderRankingForSpan: Riders3YearRollingRankingsWithResults,
    pointSystem: PointSystem
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>{riderRankingForSpan.rank_for_3_year_span}</TableCell>
                <RiderNameCell rider={riderRankingForSpan.riders} showFlagBreakpoint="md"/>
                <NationNameCell nation={riderRankingForSpan.riders.nations} className="hidden md:table-cell"/>
                <TableCell>{riderRankingForSpan.points_last_3_years}</TableCell>
                <ExpandCell isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            </TableRow>
            {isExpanded &&
                <ExpandedResultsRow
                    results={riderRankingForSpan.riders.results as unknown as Result[]}
                    pointSystem={pointSystem}
                    columns={5}
                />
            }
        </>
    )
}