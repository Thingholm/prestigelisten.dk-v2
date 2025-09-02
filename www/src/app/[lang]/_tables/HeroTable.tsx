import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";


export default function HeroTable({
    riderPointsWithNationsAndTeams = [],
}: Readonly<{
    riderPointsWithNationsAndTeams: RiderPointsWithNationAndTeam;
}>) {
    const t = useTranslations("tableColumns");

    const rankedRiderPoints = rankBy(riderPointsWithNationsAndTeams, "points");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("nation")}</TableColumn>
                <TableColumn>{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedRiderPoints.map(riderPoint => (
                    <TableRow key={riderPoint.id}>
                        <TableCell>{riderPoint.rank}</TableCell>
                        <RiderNameCell showFlagBreakpoint="md" rider={riderPoint.riders}/>
                        <NationNameCell nation={riderPoint.riders.nations} className="hidden md:table-cell" />
                        <YearCell year={riderPoint.riders.year} />
                        <TableCell>{riderPoint.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}