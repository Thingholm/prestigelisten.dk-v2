import { NationNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { NationPointsWithRiderCount } from "@/db/nationPoints";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function NationsTable({
    nationPointsWithRiderCount,
}: Readonly<{
    nationPointsWithRiderCount: NationPointsWithRiderCount;
}>) {
    const t = useTranslations("tableColumns");

    const rankedNationPoints = rankBy(nationPointsWithRiderCount.slice(0, 17), "points");
    const rankedActiveNationPoints = rankBy(nationPointsWithRiderCount, "active_points");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("nation")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("numberOfRiders")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("pointsPerRider")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedNationPoints.map(nation => (
                    <TableRow key={nation.id} isFaded={!nation.active}>
                        <TableCell secondarySpan={{content: rankedActiveNationPoints.find(i => i.id == nation.id)?.rank, inlineBreakpoint: "always"}}>{nation.rank}</TableCell>
                        <NationNameCell nation={nation} isMain/>
                        <TableCell className="hidden sm:table-cell"
                            secondarySpan={{content: nation.active_rider_count, inlineBreakpoint: "always"}}
                        >
                            {nation.rider_count}
                        </TableCell>
                        <TableCell 
                            secondarySpan={{content: nation.ative_points_per_rider, inlineBreakpoint: "always"}}
                            className="hidden md:table-cell"
                        >
                            {nation.points_per_rider}
                        </TableCell>
                        <TableCell secondarySpan={{content: nation.active_points, inlineBreakpoint: "always"}}>{nation.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}