import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function ListTable({
    riderPoints,
    rowAmount
}: Readonly<{
    riderPoints: Ranked<RiderPointsWithNationAndTeam[number]>[],
    rowAmount: number
}>) {
    const t = useTranslations("tableColumns");
    
    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("nation")}</TableColumn>
                <TableColumn>{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {riderPoints.slice(0, rowAmount).map(rider => (
                    <TableRow key={rider.id}>
                        <TableCell>{rider.rank}</TableCell>
                        <RiderNameCell rider={rider.riders} showFlagBreakpoint="sm"/>
                        <NationNameCell nation={rider.riders.nations} className="hidden sm:table-cell"/>
                        <YearCell year={rider.riders.year}/>
                        <TableCell>{rider.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}