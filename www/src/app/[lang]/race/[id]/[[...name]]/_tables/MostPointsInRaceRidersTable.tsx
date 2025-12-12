"use client";

import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import Button from "@/components/ui/Button";
import { GroupedByKey } from "@/lib/helpers/groupResults";
import { Ranked } from "@/lib/helpers/rank";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MostPointsInRaceRidersTable({
    groupResultsByRider
}: Readonly<{
    groupResultsByRider: Ranked<GroupedByKey<Tables<"results">, Tables<"riders">>>[]
}>) {
    const [rowAmount, setRowAmount] = useState(15); 
    
    const t = useTranslations("tableColumns");

    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>
                        {t("no")} 
                    </TableColumn>
                    <TableColumn>{t("rider")}</TableColumn>
                    <TableColumn className="hidden sm:table-cell">
                        {t("pointsScoringResults")}
                    </TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {groupResultsByRider.slice(0, rowAmount).map((rider) => (
                        <TableRow key={rider.key.id}>
                            <TableCell>{rider.rank}</TableCell>
                            <RiderNameCell rider={rider.key} showFlagBreakpoint="always"/>
                            <TableCell className="hidden sm:table-cell">{rider.results.length}</TableCell>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < groupResultsByRider.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    );
}