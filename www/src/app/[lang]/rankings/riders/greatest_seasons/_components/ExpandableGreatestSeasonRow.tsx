"use client";

import { Ranked } from "@/lib/helpers/rank";
import { GreatestSeasonsWithResults } from "../page";
import { useState } from "react";
import { ExpandCell, ExpandedResultsRow, NationNameCell, RiderNameCell, TableCell, TableRow, YearCell } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";

export default function ExpandableGreatestSeasonRow({
    season,
    pointSystem
}: Readonly<{
    season: Ranked<GreatestSeasonsWithResults>
    pointSystem: PointSystem
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>{season.rank}</TableCell>
                <RiderNameCell rider={season.riders} showFlagBreakpoint="sm"/>
                <NationNameCell nation={season.riders.nations} className="hidden sm:table-cell"/>
                <YearCell year={season.year}/>
                <TableCell className="hidden md:table-cell">{season.riders.year ? season.year - season.riders.year : ""}</TableCell>
                <TableCell>{season.points_for_year}</TableCell>
                <ExpandCell isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            </TableRow>
            {isExpanded &&
                <ExpandedResultsRow
                    results={season.results}
                    pointSystem={pointSystem}
                    columns={7}
                />
            }
        </>
    )
}