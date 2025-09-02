"use client";

import { Table, TableBody, TableColumn, TableHead } from "@/components/table"
import { ResultsFromYear } from "@/db/results"
import { RiderSeasonsFromYear } from "@/db/seasons"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import ExpandableRiderPointsInYearRow from "../_components/ExpandableRiderPointsInYearRow"
import { PointSystem } from "@/db/pointSystem"
import Button from "@/components/ui/Button";

export default function MostRiderPointsInYearTable({
    riderSeasonsFromYear,
    resultsFromYear,
    pointSystem
}: Readonly<{
    riderSeasonsFromYear: RiderSeasonsFromYear
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const [rowAmount, setRowAmount] = useState(15); 

    const t = useTranslations("tableColumns");

    const filteredRiderSeasonsFromYear = riderSeasonsFromYear.filter(riderSeason => riderSeason.points_for_year);
    
    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn className="pr-2 sm:pr-0">{t("no")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                    <TableColumn></TableColumn>
                </TableHead>
                <TableBody>
                    {filteredRiderSeasonsFromYear.sort((a, b) => (b.points_for_year ?? 0) - (a.points_for_year ?? 0))
                        .slice(0, rowAmount)
                        .map(riderSeason => (
                            <ExpandableRiderPointsInYearRow 
                                riderSeason={riderSeason} 
                                riderResults={resultsFromYear.filter(result => result.rider_id == riderSeason.rider_id)}
                                pointSystem={pointSystem}
                                key={riderSeason.id}
                            /> 
                        ))
                    }
                </TableBody>
            </Table>
            {rowAmount < filteredRiderSeasonsFromYear.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}