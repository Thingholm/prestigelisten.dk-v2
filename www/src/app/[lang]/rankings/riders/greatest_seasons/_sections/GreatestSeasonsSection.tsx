"use client";

import Section from "@/components/layout/Section";
import { Table, TableBody, TableColumn, TableHead } from "@/components/table";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { GreatestSeasonsWithResults } from "../page";
import { PointSystem } from "@/db/pointSystem";
import ExpandableGreatestSeasonRow from "../_components/ExpandableGreatestSeasonRow";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function GreatestSeasonsSection({
    greatestSeasons,
    pointSystem
}: Readonly<{
    greatestSeasons: Ranked<GreatestSeasonsWithResults>[],
        pointSystem: PointSystem
}>) {
    const [rowAmount, setRowAmount] = useState(25);


    const t = useTranslations("tableColumns");

    return (
        <Section>
            <div className="w-full">
                <Table>
                    <TableHead>
                        <TableColumn className="min-w-9">{t("no")}</TableColumn>
                        <TableColumn>{t("rider")}</TableColumn>
                        <TableColumn className="hidden sm:table-cell">{t("nation")}</TableColumn>
                        <TableColumn>{t("season")}</TableColumn>
                        <TableColumn className="hidden md:table-cell">{t("age")}</TableColumn>
                        <TableColumn>{t("points")}</TableColumn>
                        <TableColumn></TableColumn>
                    </TableHead>
                    <TableBody>
                        {greatestSeasons.slice(0, rowAmount).map(season => (
                            <ExpandableGreatestSeasonRow
                                season={season}
                                pointSystem={pointSystem}
                                key={season.id}
                            />
                        ))}
                    </TableBody>
                </Table>
                {rowAmount < greatestSeasons.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
            </div>
        </Section>
    )
}