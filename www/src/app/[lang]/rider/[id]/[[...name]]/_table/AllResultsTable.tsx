"use client";

import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import FlagSpan from "@/components/table/FlagSpan";
import Button from "@/components/ui/Button";
import { PointSystem } from "@/db/pointSystem";
import { Rider } from "@/db/rider";
import { GroupedResult, groupResultsByKey } from "@/lib/helpers/groupResults";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getRaceUrl, getYearUrl } from "@/lib/helpers/urls";
import { Tables } from "@/utils/supabase/database.types";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "use-intl";

export default function AllResultsTable({
    groupedResults,
    pointSystem,
    nations
}: Readonly<{
    groupedResults: GroupedResult<Rider["results"][number]>[],
    pointSystem: PointSystem
    nations: Tables<"nations">[];
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");

    const [rowAmount, setRowAmount] = useState(17);
    

    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("points")}</TableColumn>
                    <TableColumn>{t("amount")}</TableColumn>
                    <TableColumn>{t("result")}</TableColumn>
                    <TableColumn className="hidden md:table-cell">{t("years")}</TableColumn>
                </TableHead>
                <TableBody>
                    {sortGroupedResults(groupedResults).slice(0, rowAmount).map(group => {
                        const groupedByYear = groupResultsByKey(group.results, pointSystem, r => r.year)

                        return (
                            <TableRow key={group.id}>
                                <TableCell>{group.points}</TableCell>
                                <TableCell>{group.results.length}</TableCell>
                                <TableCell className="font-medium">
                                    <Link href={getRaceUrl(group.races.meta_races)} className="hover:underline">
                                        <FlagSpan code={nations.find(nation => nation.id == group.races.meta_races.nation_id)?.code}/>
                                        {getGroupedResultName(group, tResultNames, true)}
                                    </Link>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {groupedByYear.sort((a, b) => b.key - a.key).map((result, index) => (
                                        <span key={result.key}>
                                            {index != 0 ? ", " : ""}
                                            <Link href={getYearUrl(result.key)} className="hover:underline">{result.key}<span className="opacity-70 font-light">{result.results.length > 1 ? ` (${result.results.length}x)` : ""}</span></Link>
                                        </span>
                                    ))}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {rowAmount < groupedResults.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 20)}>{t("showMore")}</Button>}
        </div>
    )
}