import { Settings } from "./ContentWrapper";
import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "./table";
import { Tables } from "@/lib/supabase/database.types";
import { Rider } from "@/lib/db/riders";
import { rankBy } from "@/lib/helpers/rank";
import { useT } from "@/lib/helpers/translations";

export default function RankingsTableSection({
    rider,
    riderPoints,
    settings,
    locale
}: Readonly<{
    rider: Rider,
    riderPoints: Tables<"riders">[],
    settings: Settings,
    locale: "en" | "da"
}>) {
    const t = useT("twitterCard", locale);
    const tTableColumns = useT("tableColumns", locale);

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