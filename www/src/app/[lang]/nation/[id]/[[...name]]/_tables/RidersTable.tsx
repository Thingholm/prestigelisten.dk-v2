"use client";

import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import Button from "@/components/ui/Button";
import { NationWithRiders } from "@/db/nations";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RidersTable({
    riders
}: Readonly<{
    riders: Ranked<NationWithRiders["riders"][number]>[]
}>) {
    const t = useTranslations("tableColumns");

    const [rowAmount, setRowAmount] = useState(15);

    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn>{t("year")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {riders.slice(0, rowAmount).map(rider => (
                        <TableRow key={rider.id}>
                            <TableCell>{rider.rank}</TableCell>
                            <RiderNameCell rider={rider} showFlagBreakpoint="always"/>
                            <YearCell year={rider.year}/>
                            <TableCell>{rider.rider_seasons[0].points_all_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < riders.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}