"use client";

import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import FlagSpan from "@/components/table/FlagSpan";
import Button from "@/components/ui/Button";
import { NationWithRiders } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { Race } from "@/db/race";
import { groupResults, groupResultsByKey } from "@/lib/helpers/groupResults";
import { getRaceFlagCode } from "@/lib/helpers/raceFlags";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { getRiderName } from "@/lib/helpers/riderName";
import { getRaceUrl, getRiderUrl } from "@/lib/helpers/urls";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";

export default function GreatestResultsTable({
    nation,
    pointSystem,
    results
}: Readonly<{
    nation: NationWithRiders,
    pointSystem: PointSystem,
    results: (Tables<'results'> & { races: Race })[]
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");

    const [rowAmount, setRowAmount] = useState(10);

    const groupedResults = groupResults(results, pointSystem).map(group => ({
        ...group,
        results: group.results.sort((a, b) => b.points - a.points),
        riderResults: groupResultsByKey(group.results, pointSystem, r => r.rider_id)
    }));

    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn>{t("result")}</TableColumn>
                    <TableColumn className="hidden lg:table-cell">{t("riders")}</TableColumn>
                    <TableColumn>{t("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {groupedResults
                        .sort((a, b) => b.results[0].points - a.results[0].points)
                        .slice(0, rowAmount)
                        .map(group => {
                            const riderResults = () => {
                                return (
                                    group.riderResults
                                        .sort((a, b) => Math.max(...a.results.map(r => r.year)) - Math.max(...b.results.map(r => r.year)))
                                        .map((riderGroup, riderIndex) => {
                                            const rider = nation.riders.find(r => r.id == riderGroup.key);

                                            if (!rider) return null;

                                            return (
                                                <span key={rider.id}>
                                                    <Link href={getRiderUrl(rider)} className="hover:underline">
                                                        <span>{getRiderName(rider)} </span>
                                                        <span>
                                                            ({riderGroup.results
                                                                .sort((a, b) => a.year - b.year)
                                                                .map((result, resultIndex) => resultIndex == 0 ? `${result.year}` : `, ${result.year}`)
                                                            })
                                                        </span>
                                                    </Link>
                                                    {riderIndex < group.riderResults.length - 1 ? ", " : ""}
                                                </span>
                                            )
                                        })
                                )
                            }

                            return (
                                <React.Fragment key={group.id}>
                                    <TableRow className="font-medium lg:font-normal">
                                        <TableCell className="min-w-52">
                                            <Link href={getRaceUrl(group.races.meta_races)} className="hover:underline">
                                                <FlagSpan code={getRaceFlagCode(group.races.meta_races)}/>
                                                {group.results.length > 1 && <span>{group.results.length}x </span>}
                                                {getGroupedResultName(group, tResultNames)}
                                            </Link>
                                            </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {riderResults()}
                                        </TableCell>
                                        <TableCell>{group.results[0].points}</TableCell>
                                    </TableRow>
                                    <TableRow className="lg:hidden" hasBorder={false}>
                                        <TableCell colSpan={3} className="pt-2">
                                            {riderResults()}
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {rowAmount < groupedResults.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 15)}>{t("showMore")}</Button>}
        </div>
    )
}