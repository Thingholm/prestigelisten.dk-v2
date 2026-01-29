"use client";

import { NationNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import Button from "@/components/ui/Button";
import { GroupedByKey } from "@/lib/helpers/groupResults";
import { Ranked } from "@/lib/helpers/rank";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MostPointsInRaceNationsTable({
    groupResultsByNations
}: Readonly<{
    groupResultsByNations: Ranked<GroupedByKey<Tables<"results">, Tables<"nations">>>[]
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
                    {groupResultsByNations.slice(0, rowAmount).map((rider) => (
                        <TableRow key={rider.key.id}>
                            <TableCell>{rider.rank}</TableCell>
                            <NationNameCell nation={rider.key} isMain/>
                            <TableCell className="hidden sm:table-cell">{rider.results.length}</TableCell>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < groupResultsByNations.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    );
}