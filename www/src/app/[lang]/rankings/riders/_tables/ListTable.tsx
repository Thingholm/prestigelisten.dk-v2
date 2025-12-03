import { NationNameCell, RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function ListTable({
    riderPoints,
    rowAmount,
    highlightedRiderId,
    alltimeRankingsLookupList,
    isFiltered
}: Readonly<{
    riderPoints: Ranked<RiderPointsWithNationAndTeam[number]>[],
    rowAmount: number,
    highlightedRiderId: number | null,
    alltimeRankingsLookupList: Ranked<{
        id: number;
        points: number;
    }>[],
    isFiltered: boolean
}>) {
    const t = useTranslations("tableColumns");
    
    return (
        <Table>
            <TableHead>
                <TableColumn>
                    {t("no")}
                    {isFiltered && <SecondaryCellSpan className="table-cell sm:hidden font-medium">{t("allTime")}</SecondaryCellSpan>}
                </TableColumn>
                {isFiltered && <TableColumn className="hidden sm:table-cell">{t("allTime")}</TableColumn>}
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("nation")}</TableColumn>
                <TableColumn>{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {riderPoints.slice(0, rowAmount).map(rider => {
                    var alltimeRanking = alltimeRankingsLookupList.find(alltimeRanking => alltimeRanking.id == rider.rider_id)?.rank;

                    return (
                        <TableRow 
                            key={rider.id} 
                            id={`rider-${rider.id}`} 
                            isHighlighted={rider.id == highlightedRiderId}
                        >
                            <TableCell>
                                {rider.rank}
                                {isFiltered && <SecondaryCellSpan className="table-cell sm:hidden">{alltimeRanking}</SecondaryCellSpan>}
                            </TableCell>
                            {isFiltered && <TableCell className="hidden sm:table-cell">{alltimeRanking}</TableCell>}
                            <RiderNameCell rider={rider.riders} showFlagBreakpoint="sm"/>
                            <NationNameCell nation={rider.riders.nations} className="hidden sm:table-cell"/>
                            <YearCell year={rider.riders.year}/>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}