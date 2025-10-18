import { Rider } from "@/db/rider";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Settings } from "./ContentWrapper";
import { useTranslations } from "next-intl";
import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { rankBy } from "@/lib/helpers/rank";

export default function RankingsTableSection({
    rider,
    riderPoints,
    settings
}: Readonly<{
    rider: Rider,
    riderPoints: RiderPointsWithNationAndTeam,
    settings: Settings
}>) {
    const t = useTranslations("twitterCard");
    const tTableColumns = useTranslations("tableColumns");

    const rankedRiders = rankBy(riderPoints, "points")

    const riderIndex = rankedRiders.findIndex(rp => rp.rider_id == rider.id);

    return (
        <div className="mt-2">
            <p className="font-semibold">{settings.showActiveRankingTable ? t("placementActive") : t("alltimePlacement")}</p>
            <Table className="text-sm">
                <TableHead>
                    <TableColumn>{tTableColumns("placement")}</TableColumn>
                    <TableColumn>{tTableColumns("rider")}</TableColumn>
                    <TableColumn>{tTableColumns("year")}</TableColumn>
                    <TableColumn>{tTableColumns("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {rankedRiders?.slice(
                        riderIndex - (riderIndex > 2 ? 2 : riderIndex), 
                        riderIndex + (riderIndex > 2 ? 2 : 4 - riderIndex)
                    ).map(rankedRider => (
                        <TableRow 
                            key={rankedRider.id}
                            style={{ backgroundColor: rankedRider.rider_id == rider.id ? settings.colorHex : "" }}
                            className={rankedRider.rider_id == rider.id ? settings.whiteText ? "text-white font-semibold" : "font-semibold" : ""}
                        >
                            <TableCell>{rankedRider.rank}</TableCell>
                            <RiderNameCell rider={rankedRider.riders} showFlagBreakpoint="always"/>
                            <YearCell year={rankedRider.riders.year}/>
                            <TableCell>{rankedRider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}