import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { Rider, RidersWithNationAndTeam } from "@/db/rider";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function RidersByNationTable({
    rider,
    rankedRiders
}: Readonly<{
    rider: Rider,
    rankedRiders: Ranked<RidersWithNationAndTeam[number]>[]
}>) {
    const t = useTranslations("tableColumns");
    
    const slicedRankedRiders = rankedRiders.slice(0, 17)
    const currentRider = rankedRiders.find(rankedRider => rankedRider.id == rider.id);
    if (currentRider && !slicedRankedRiders.some(r => r.id == rider.id)) {
        slicedRankedRiders.splice(16, 1, currentRider);
    }

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn>{t("year")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {slicedRankedRiders.map(rankedRider => (
                    <TableRow key={rankedRider.id} isHighlighted={rankedRider.id== rider.id}>
                        <TableCell>{rankedRider.rank}</TableCell>
                        <RiderNameCell rider={rankedRider} showFlagBreakpoint="always"/>
                        <YearCell year={rankedRider.year}/>
                        <TableCell>{rankedRider.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}