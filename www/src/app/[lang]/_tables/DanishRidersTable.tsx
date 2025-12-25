import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RidersWithNationAndTeam } from "@/db/rider";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function DanishRidersTable({
    ridersWithNationAndTeam = [],
}: Readonly<{
    ridersWithNationAndTeam: RidersWithNationAndTeam;
}>) {
    const t = useTranslations("tableColumns");

    const rankedRiderPoints = rankBy(
        ridersWithNationAndTeam
            .filter(rider => rider.nations.code == "dk")
            .slice(0, 17),
        "points"
    );

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn>{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedRiderPoints.map(riderPoint => (
                    <TableRow key={riderPoint.id}>
                        <TableCell>{riderPoint.rank}</TableCell>
                        <RiderNameCell showFlagBreakpoint="always" rider={riderPoint}/>
                        <YearCell year={riderPoint.year} />
                        <TableCell>{riderPoint.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}