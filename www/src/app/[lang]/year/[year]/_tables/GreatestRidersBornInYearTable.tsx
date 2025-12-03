"use client";

import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import Button from "@/components/ui/Button";
import { RidersFromYear } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function GreatestRidersBornInYearTable({
    ridersFromYear,
}: Readonly<{
    ridersFromYear: RidersFromYear
}>) {
    const [rowAmount, setRowAmount] = useState(15); 

    const t = useTranslations("tableColumns");

    const ridersFromYearRanked = rankBy(ridersFromYear, "points");

    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn className="hidden sm:table-cell">{t("allTime")}</TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn className="hidden md:table-cell">{t("nation")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>            
                </TableHead>
                <TableBody>
                    {ridersFromYearRanked.slice(0, rowAmount).map(rider => (
                        <TableRow key={rider.id}>
                            <TableCell>{rider.rank}</TableCell>
                            <TableCell className="hidden sm:table-cell">{rider.riders?.rider_seasons[0].rank_all_time}</TableCell>
                            <RiderNameCell rider={rider.riders} showFlagBreakpoint="md"/>
                            <NationNameCell nation={rider.riders.nations} className="hidden md:table-cell"/>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < ridersFromYearRanked.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}