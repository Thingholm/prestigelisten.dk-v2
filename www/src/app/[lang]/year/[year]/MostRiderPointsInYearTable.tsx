import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table"
import { ResultsFromYear } from "@/db/results"
import { RiderSeasonsFromYear } from "@/db/seasons"
import { useTranslations } from "next-intl"
import React from "react"
import ExpandableRiderPointsInYearRow from "./ExpandableRiderPointsInYearRow"
import { PointSystem } from "@/db/pointSystem"

export default function MostRiderPointsInYearTable({
    riderSeasonsFromYear,
    resultsFromYear,
    pointSystem
}: Readonly<{
    riderSeasonsFromYear: RiderSeasonsFromYear
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const t = useTranslations("tableColumns");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
                <TableColumn></TableColumn>
            </TableHead>
            <TableBody>
                {riderSeasonsFromYear.sort((a, b) => (b.points_for_year ?? 0) - (a.points_for_year ?? 0))
                    .slice(0, 15)
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
    )
}