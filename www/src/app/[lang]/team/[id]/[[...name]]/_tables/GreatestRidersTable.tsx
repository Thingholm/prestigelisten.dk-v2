"use client";

import { NationNameCell, RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import Button from "@/components/ui/Button";
import { ActiveRiderPointsLookup } from "@/db/rider";
import { TeamWithRiders } from "@/db/team";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function GreatestRidersTable({
    teamWithRiders,
    rankedActiveRiderPointsLookup
}: Readonly<{
    teamWithRiders: TeamWithRiders;
    rankedActiveRiderPointsLookup: Ranked<ActiveRiderPointsLookup[number]>[];
}>) {
    const [rowAmount, setRowAmount] = useState(15); 
    
    const t = useTranslations("tableColumns");

    const ridersSorted = teamWithRiders.riders.sort((a, b) => b.rider_seasons[0]?.points_all_time - a.rider_seasons[0]?.points_all_time);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn>
                        {t("no")} 
                        <SecondaryCellSpan isColumn inlineBreakpoint="sm">{t("activeOnlySpan")}</SecondaryCellSpan>
                    </TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn className="hidden md:table-cell">{t("nation")}</TableColumn>
                    <TableColumn className="hidden sm:table-cell">{t("year")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {ridersSorted.slice(0, rowAmount).map((rider, index) => (
                        <TableRow key={rider.id} className={`${(index > 10 && rowAmount == 15) && "hidden sm:table-row"}`}>
                            <TableCell>
                                {rider.rider_seasons[0]?.rank_all_time} 
                                <SecondaryCellSpan inlineBreakpoint="sm">{rankedActiveRiderPointsLookup.find(i => i.id == rider.id)?.rank}</SecondaryCellSpan>
                            </TableCell>
                            <RiderNameCell rider={rider} showFlagBreakpoint="md"/>
                            <NationNameCell nation={rider.nations} className="hidden md:table-cell"/>
                            <YearCell year={rider.year} className="hidden sm:table-cell"/>
                            <TableCell>{rider.rider_seasons[0]?.points_all_time ?? "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < ridersSorted.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    );
}