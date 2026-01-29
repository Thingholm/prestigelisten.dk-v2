"use client";

import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import Button from "@/components/ui/Button";
import { RiderSeasonsFromYear } from "@/db/seasons"
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AlltimeRidersForYearTable({
    riderSeasonsFromYear,
}: Readonly<{
    riderSeasonsFromYear: RiderSeasonsFromYear
}>) {
    const [rowAmount, setRowAmount] = useState(15); 
    
    const t = useTranslations("tableColumns");
    
    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn>{t("year")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {riderSeasonsFromYear.sort((a, b) => b.points_all_time - a.points_all_time)
                        .slice(0, rowAmount)
                        .map(riderSeason => (
                            <TableRow key={riderSeason.id}>
                                <TableCell>{riderSeason.rank_all_time}</TableCell>
                                <RiderNameCell rider={riderSeason.riders} showFlagBreakpoint="always"/>
                                <YearCell year={riderSeason.riders.year}/>
                                <TableCell>{riderSeason.points_all_time}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {rowAmount < riderSeasonsFromYear.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}