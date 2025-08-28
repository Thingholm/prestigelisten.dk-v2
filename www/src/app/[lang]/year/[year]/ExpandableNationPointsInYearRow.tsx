"use client";

import { ExpandCell, ExpandedResultsRow, NationNameCell, TableCell, TableRow } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { ResultsFromYear } from "@/db/results";
import { NationSeasonsFromYear } from "@/db/seasons";
import React, { useState } from "react";

export default function ExpandableNationPointsInYearRow({
    nationSeason,
    nationResults,
    pointSystem
}: Readonly<{
    nationSeason: NationSeasonsFromYear[number]
    nationResults: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow >
                <TableCell>{nationSeason.rank_for_year}</TableCell>
                <NationNameCell nation={nationSeason.nations}/>
                <TableCell>{nationSeason.points_for_year}</TableCell>
                <ExpandCell isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            </TableRow>
            {isExpanded &&
                <ExpandedResultsRow 
                    results={nationResults} 
                    pointSystem={pointSystem}
                    columns={4}
                    distinctPlacements
                />
            }
        </>
    )
}