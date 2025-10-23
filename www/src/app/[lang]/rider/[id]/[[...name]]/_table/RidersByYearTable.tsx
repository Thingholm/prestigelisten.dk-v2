
import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { Rider } from "@/db/rider";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Ranked } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function RidersByYearTable({
    rider,
    rankedRiders
}: Readonly<{
    rider: Rider,
    rankedRiders: Ranked<RiderPointsWithNationAndTeam[number]>[]
}>) {
    const t = useTranslations("tableColumns");
    
    const slicedRankedRiders = rankedRiders.slice(0, 17)
    const currentRider = rankedRiders.find(rider => rider.rider_id == rider.id);
    if (currentRider && !slicedRankedRiders.some(r => r.rider_id == rider.id)) {
        slicedRankedRiders.splice(16, 1, currentRider);
    }

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("nation")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {slicedRankedRiders.map(rankedRider => (
                    <TableRow key={rankedRider.id} isHighlighted={rankedRider.rider_id == rider.id}>
                        <TableCell>{rankedRider.rank}</TableCell>
                        <RiderNameCell rider={rankedRider.riders} showFlagBreakpoint="sm"/>
                        <NationNameCell nation={rankedRider.riders.nations} className="hidden sm:table-cell"/>
                        <TableCell>{rankedRider.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}