import { Rider, RidersWithNationAndTeam } from "@/db/rider";
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
    riderPoints: RidersWithNationAndTeam,
    settings: Settings
}>) {
    const t = useTranslations("twitterCard");
    const tTableColumns = useTranslations("tableColumns");

    const rankedRiders = rankBy(riderPoints, "points")

    const riderIndex = rankedRiders.findIndex(rp => rp.id == rider.id);

    return (
        <div className="mt-2">
            <p className="font-semibold">{settings.showActiveRankingTable ? t("placementActive") : t("alltimePlacement")}</p>
            <Table className="text-sm">
                <TableHead>
                    <TableColumn>{tTableColumns("no")}</TableColumn>
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
                            style={{ backgroundColor: rankedRider.id == rider.id ? settings.colorHex : "" }}
                            className={rankedRider.id == rider.id ? settings.whiteText ? "text-white font-semibold" : "font-semibold" : ""}
                        >
                            <TableCell>{rankedRider.rank}</TableCell>
                            <RiderNameCell rider={rankedRider} showFlagBreakpoint="always"/>
                            <YearCell year={rankedRider.year}/>
                            <TableCell>{rankedRider.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}