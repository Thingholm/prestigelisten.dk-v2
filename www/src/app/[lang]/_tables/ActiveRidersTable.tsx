import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { rankBy } from "@/lib/helpers/rank";
import { getTeamUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";

export default function ActiveRidersTable({
    riderPointsWithNationAndTeam = [],
}: Readonly<{
    riderPointsWithNationAndTeam: RiderPointsWithNationAndTeam;
}>) {
    const t = useTranslations("tableColumns");

    const rankedRiderPoints = rankBy(
        riderPointsWithNationAndTeam
            .filter(rider => rider.riders.active)
            .slice(0, 17),
        "points"
    );
    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("team")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedRiderPoints.map((riderPoint, index) => (
                    <TableRow key={riderPoint.id} responsiveSlice={{ breakpoint: "sm", end: 12, rowIndex: index }} >
                        <TableCell>{riderPoint.rank}</TableCell>
                        <RiderNameCell 
                            showFlagBreakpoint="always" 
                            rider={riderPoint.riders} 
                            secondarySpan={{ content: riderPoint.riders.teams?.name, breakpoint: "sm" }}
                        />
                        <TableCell href={getTeamUrl(riderPoint.riders.teams)} className="hidden sm:table-cell">{riderPoint.riders.teams?.name}</TableCell>
                        <YearCell year={riderPoint.riders.year} className="hidden md:table-cell" />
                        <TableCell>{riderPoint.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}