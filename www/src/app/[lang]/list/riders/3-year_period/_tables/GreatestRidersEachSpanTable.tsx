"use client"

import { Table, TableBody, TableColumn, TableHead } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { Riders3YearRollingRankingsWithResults } from "@/db/riders3YearRollingRankings";
import { useTranslations } from "next-intl";
import ExpandableRidersEachSpanRow from "../_components/ExpandableRidersEachSpanRow";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function GreatestRidersEachSpanTable({
    riderRankingsForSpan,
    pointSystem
}: Readonly<{
    riderRankingsForSpan: Riders3YearRollingRankingsWithResults[],
    pointSystem: PointSystem
}>) {
    const t = useTranslations("tableColumns");
    
    const [rowAmount, setRowAmount] = useState(15);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn className="min-w-9">
                        {t("no")}
                    </TableColumn>
                    <TableColumn>
                        {t("rider")}
                    </TableColumn>
                    <TableColumn className="hidden md:table-cell">
                        {t("nation")}
                    </TableColumn>
                    <TableColumn>
                        {t("points")}
                    </TableColumn>
                </TableHead>
                <TableBody>
                    {riderRankingsForSpan.slice(0, rowAmount).map(span => (
                        <ExpandableRidersEachSpanRow riderRankingForSpan={span} pointSystem={pointSystem}/>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < riderRankingsForSpan.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}