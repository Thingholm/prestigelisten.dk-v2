import { NationNameCell, RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RidersWithNationAndTeam } from "@/db/rider";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function ListTable({
    riders,
    rowAmount,
    highlightedRiderId,
    alltimeRankingsLookupList,
    isFiltered
}: Readonly<{
    riders: Ranked<RidersWithNationAndTeam[number]>[],
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
                {riders.slice(0, rowAmount).map(rider => {
                    const alltimeRanking = alltimeRankingsLookupList.find(alltimeRanking => alltimeRanking.id == rider.id)?.rank;

                    return (
                        <TableRow 
                            key={rider.id} 
                            id={`rider-${rider.id}`} 
                            isHighlighted={rider.id == highlightedRiderId}
                        >
                            <TableCell>
                                <span className="pr-1.5 sm:pr-0">{rider.rank}</span>
                                {isFiltered && <SecondaryCellSpan className="table-cell sm:hidden">{alltimeRanking}</SecondaryCellSpan>}
                            </TableCell>
                            {isFiltered && <TableCell className="hidden sm:table-cell">{alltimeRanking}</TableCell>}
                            <RiderNameCell rider={rider} showFlagBreakpoint="sm"/>
                            <NationNameCell nation={rider.nations} className="hidden sm:table-cell"/>
                            <YearCell year={rider.year}/>
                            <TableCell>{rider.points}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}