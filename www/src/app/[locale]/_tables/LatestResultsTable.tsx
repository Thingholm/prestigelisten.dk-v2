import { RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table"
import { getDateString } from "@/lib/helpers/dateFormatter";
import { RankingEvolution } from "@/lib/helpers/rankingEvolution";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { getRaceUrl } from "@/lib/helpers/urls";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import React from "react";
import { IoCaretUp } from "react-icons/io5";

export default async function LatestResultsTable({
    latestResultsGroups
}: Readonly<{
    latestResultsGroups: RankingEvolution[]
}>) {
    const locale = await getLocale();

    const t = await getTranslations("tableColumns");
    const tResultNames = await getTranslations("getResultNames");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn className="hidden lg:table-cell"><IoCaretUp className="fill-green-600 inline"/></TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("result")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("pointsGained")}</TableColumn>
                <TableColumn className="hidden lg:table-cell">{t("points")}</TableColumn>
                <TableColumn>{t("date")} <SecondaryCellSpan isColumn>{t("dateFormatNoYear")}</SecondaryCellSpan></TableColumn>
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
                                                <Link prefetch={false}  href={getRaceUrl(result.races.meta_races)} className="hover:underline">{getGroupedResultName(result, tResultNames, true, true)}</Link>
                                            </span>
                                        ))}
                                    </>
                                )
                                return (
                                    <TableRow key={riderGroup.key}>
                                        <TableCell className="!pr-4">
                                            {date.rankings?.find(r => r.id == riderGroup.key)?.rank} 
                                            <SecondaryCellSpan>{date.prevRankings?.find(r => r.id == riderGroup.key)?.rank}</SecondaryCellSpan>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {`${(date.prevRankings?.find(r => r.id == riderGroup.key)?.rank ?? (date.prevRankings?.length ?? 0)) - (date.rankings?.find(r => r.id == riderGroup.key)?.rank ?? 0)}`} 
                                        </TableCell>
                                        <RiderNameCell rider={riderGroup.results[0].riders} showFlagBreakpoint="always" secondarySpan={{
                                            breakpoint: "md", 
                                            content: riderResults()
                                        }}/>
                                        <TableCell className="hidden md:table-cell">{riderResults()}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{riderGroup.points}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {date.rankings?.find(r => r.id == riderGroup.key)?.points} 
                                            <SecondaryCellSpan>{date.prevRankings?.find(r => r.id == riderGroup.key)?.points}</SecondaryCellSpan>
                                        </TableCell>
                                        <TableCell className="text-nowrap">{getDateString(riderGroup.results[0].race_dates?.date, locale)}</TableCell>
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