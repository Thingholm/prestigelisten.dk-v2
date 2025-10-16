import { RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table"
import { ResultWithRaceDate } from "@/db/results";
import { GroupedByKey } from "@/lib/helpers/groupResults";
import { Ranked } from "@/lib/helpers/rank";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { getRaceUrl } from "@/lib/helpers/urls";
import { Tables } from "@/utils/supabase/database.types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

export default async function LatestResultsTable({
    latestResultsGroups
}: Readonly<{
    latestResultsGroups: {
        results: GroupedByKey<ResultWithRaceDate & {
            points: number;
        }, number>[];
        rankings: Ranked<Tables<"rider_points">>[];
        prevRankings: Ranked<Tables<"rider_points">>[] | null;
        key: string | undefined;
        points: number;
    }[]
}>) {
    const t = await getTranslations("tableColumns");
    const tResultNames = await getTranslations("getResultNames");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn className="hidden lg:table-cell">{t("change")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("result")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("pointsGained")}</TableColumn>
                <TableColumn className="hidden lg:table-cell">{t("points")}</TableColumn>
                <TableColumn>{t("date")}</TableColumn>
            </TableHead>
            <TableBody>
                {latestResultsGroups.map(date => (
                    <React.Fragment key={date.key}>
                        {date.results
                            .sort((a, b) => (a.results[0].placement ?? 0) - (b.results[0].placement ?? 0))
                            .sort((a, b) => b.points - a.points)
                            .map(riderGroup => {
                                const riderResults = () => (
                                    <>
                                        {riderGroup.results.sort((a, b) => b.points - a.points).map((result, resultIndex) => (
                                            <span key={resultIndex}>
                                                {resultIndex > 0  
                                                    ? (resultIndex == riderGroup.results.length - 1
                                                        ? ` ${t("and")} `
                                                        : ", ")
                                                    : ""
                                                }
                                                <Link href={getRaceUrl(result.races.meta_races)} className="hover:underline">{getGroupedResultName(result, tResultNames, true)}</Link>
                                            </span>
                                        ))}
                                    </>
                                )
                                return (
                                    <TableRow key={riderGroup.key}>
                                        <TableCell className="!pr-4">
                                            {date.rankings?.find(r => r.rider_id == riderGroup.key)?.rank} 
                                            <SecondaryCellSpan>{date.prevRankings?.find(r => r.rider_id == riderGroup.key)?.rank}</SecondaryCellSpan>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {`${(date.prevRankings?.find(r => r.rider_id == riderGroup.key)?.rank ?? (date.prevRankings?.length ?? 0)) - (date.rankings?.find(r => r.rider_id == riderGroup.key)?.rank ?? 0)}`} 
                                        </TableCell>
                                        <RiderNameCell rider={riderGroup.results[0].riders} showFlagBreakpoint="always" secondarySpan={{
                                            breakpoint: "md", 
                                            content: riderResults()
                                        }}/>
                                        <TableCell className="hidden md:table-cell">{riderResults()}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{riderGroup.points}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {date.rankings?.find(r => r.rider_id == riderGroup.key)?.points} 
                                            <SecondaryCellSpan>{date.prevRankings?.find(r => r.rider_id == riderGroup.key)?.points}</SecondaryCellSpan>
                                        </TableCell>
                                        <TableCell className="text-nowrap">{`${riderGroup.results[0].race_dates?.date.split("-")[2]}-${riderGroup.results[0].race_dates?.date.split("-")[1]}`}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    )
}