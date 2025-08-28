"use client";

import { Table, TableBody, TableColumn, TableHead } from "@/components/table"
import { ResultsFromYear } from "@/db/results"
import { NationSeasonsFromYear } from "@/db/seasons"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { PointSystem } from "@/db/pointSystem"
import ExpandableNationPointsInYearRow from "./ExpandableNationPointsInYearRow"
import Button from "@/components/ui/Button";

export default function MostNationPointsInYearTable({
    nationSeasonsFromYear,
    resultsFromYear,
    pointSystem
}: Readonly<{
    nationSeasonsFromYear: NationSeasonsFromYear
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const [rowAmount, setRowAmount] = useState(15); 

    const t = useTranslations("tableColumns");

    const filteredNationSeasonsFromYear = nationSeasonsFromYear.filter(nationSeason => nationSeason.points_for_year);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                    <TableColumn></TableColumn>
                </TableHead>
                <TableBody>
                    {filteredNationSeasonsFromYear.sort((a, b) => (b.points_for_year ?? 0) - (a.points_for_year ?? 0))
                        .slice(0, rowAmount)
                        .map(nationSeason => (
                            <ExpandableNationPointsInYearRow 
                                nationSeason={nationSeason} 
                                nationResults={resultsFromYear.filter(result => result.riders.nation_id == nationSeason.nation_id)}
                                pointSystem={pointSystem}
                                key={nationSeason.id}
                            /> 
                        ))
                    }
                </TableBody>
            </Table>
            {rowAmount < filteredNationSeasonsFromYear.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 15)}>{t("showMore")}</Button>}
        </div>
    )
}