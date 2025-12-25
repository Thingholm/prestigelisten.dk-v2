import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { RidersWithNationAndTeam } from "@/db/rider";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";


export default function HeroTable({
    ridersWithNationAndTeam = [],
}: Readonly<{
    ridersWithNationAndTeam: RidersWithNationAndTeam;
}>) {
    const t = useTranslations("tableColumns");

    const rankedRiders = rankBy(ridersWithNationAndTeam, "points");

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
                {rankedRiders.map(rider => (
                    <TableRow key={rider.id}>
                        <TableCell>{rider.rank}</TableCell>
                        <RiderNameCell showFlagBreakpoint="md" rider={rider}/>
                        <NationNameCell nation={rider.nations} className="hidden md:table-cell" />
                        <YearCell year={rider.year} />
                        <TableCell>{rider.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}