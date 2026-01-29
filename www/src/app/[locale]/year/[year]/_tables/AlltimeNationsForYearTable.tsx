"use client";

import { NationNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import Button from "@/components/ui/Button";
import { NationSeasonsFromYear } from "@/db/seasons"
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AlltimeNationsForYearTable({
    nationSeasonsFromYear,
}: Readonly<{
    nationSeasonsFromYear: NationSeasonsFromYear
}>) {
    const [rowAmount, setRowAmount] = useState(15); 
    
    const t = useTranslations("tableColumns");
    
    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn>{t("no")}</TableColumn>
                    <TableColumn>{t("nation")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {nationSeasonsFromYear.sort((a, b) => b.points_all_time - a.points_all_time)
                        .slice(0, rowAmount)
                        .map(nationSeason => (
                            <TableRow key={nationSeason.id}>
                                <TableCell>{nationSeason.rank_all_time}</TableCell>
                                <NationNameCell nation={nationSeason.nations} isMain/>
                                <TableCell>{nationSeason.points_all_time}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {rowAmount < nationSeasonsFromYear.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
    )
}