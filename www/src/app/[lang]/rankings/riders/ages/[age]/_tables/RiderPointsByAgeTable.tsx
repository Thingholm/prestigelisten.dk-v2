"use client";

import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import Button from "@/components/ui/Button";
import { RiderPointsByAge } from "@/db/riderPointsByAge";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RiderPointsByAgeTable({
    riderPointsByAge
}: Readonly<{
    riderPointsByAge: Ranked<RiderPointsByAge>[]
}>) {
    const t = useTranslations("tableColumns")

    const [rowAmount, setRowAmount] = useState(20)

    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn className="hidden sm:table-cell">{t("nation")}</TableColumn>
                    <TableColumn>{t("year")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {riderPointsByAge.slice(0, rowAmount).map(rider => (
                        <TableRow key={rider.id}>
                            <TableCell>{rider.rank}</TableCell>
                            <RiderNameCell rider={rider.riders} showFlagBreakpoint="sm"/>
                            <NationNameCell nation={rider.riders.nations} className="hidden sm:table-cell"/>
                            <YearCell year={rider.riders.year}/>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < riderPointsByAge.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}