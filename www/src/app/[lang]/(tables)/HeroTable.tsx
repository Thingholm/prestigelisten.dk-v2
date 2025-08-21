import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import NationNameCell from "@/components/table/NationNameCell";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import { getYearUrl } from "@/lib/helpers/urls";
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
                        <TableCell noFormat href={getYearUrl(riderPoint.riders.year)}>{riderPoint.riders.year}</TableCell>
                        <TableCell>{riderPoint.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}