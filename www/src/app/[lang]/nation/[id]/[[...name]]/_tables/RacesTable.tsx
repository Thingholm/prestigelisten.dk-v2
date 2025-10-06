"use client";

import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import Button from "@/components/ui/Button";
import { Race } from "@/db/race";
import { urls } from "@/lib/constants/urls";
import { getRaceName } from "@/lib/helpers/raceName";
import { getRaceUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RacesTable({
    races,
}: Readonly<{
    races: Race[]
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");
    const tRaceClasses = useTranslations("raceClasses");

    const [rowAmount, setRowAmount] = useState(20);
    
    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("races")}</TableColumn>
                    <TableColumn className="max-w-32 sm:max-w-none">{t("latestPointSystem")}</TableColumn>
                </TableHead>
                <TableBody>
                    {races
                        .sort((a, b) => a.meta_races.name.localeCompare(b.meta_races.name))
                        .sort((a, b) => a.race_classes.sorting_index - b.race_classes.sorting_index)
                        .slice(0, rowAmount)
                        .map(race => {
                            const raceClassesToBeAbbreviated = [12, 13, 14, 15]
                            const raceClassName = tRaceClasses(`${race.race_class_id}${raceClassesToBeAbbreviated.includes(race.race_class_id) ? "abbr" : ""}`)

                            return (
                                <TableRow key={race.id}>
                                    <TableCell href={getRaceUrl(race.meta_races)} className="text-pretty">{getRaceName(race.meta_races, tResultNames)}</TableCell>
                                    <TableCell href={`${urls["pointSystem"]}#${race.race_class_id}`}>{raceClassName}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {rowAmount < races.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
        
    )
}