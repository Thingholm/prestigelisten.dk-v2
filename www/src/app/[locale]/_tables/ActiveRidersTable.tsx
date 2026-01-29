import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RidersWithNationAndTeam } from "@/db/rider";
import { rankBy } from "@/lib/helpers/rank";
import { getTeamUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";

export default function ActiveRidersTable({
    ridersWithNationAndTeam = [],
}: Readonly<{
    ridersWithNationAndTeam: RidersWithNationAndTeam;
}>) {
    const t = useTranslations("tableColumns");

    const rankedRiderPoints = rankBy(
        ridersWithNationAndTeam
            .filter(rider => rider.active)
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
                            rider={riderPoint} 
                            secondarySpan={{ content: riderPoint.teams?.name, breakpoint: "sm" }}
                        />
                        <TableCell href={getTeamUrl(riderPoint.teams)} className="hidden sm:table-cell">{riderPoint.teams?.name}</TableCell>
                        <YearCell year={riderPoint.year} className="hidden md:table-cell" />
                        <TableCell>{riderPoint.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}