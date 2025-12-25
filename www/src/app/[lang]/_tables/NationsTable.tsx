import { NationNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { NationWithTopRidersAndCount } from "@/db/nations";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";

export default function NationsTable({
    nationPointsWithRiderCount,
}: Readonly<{
    nationPointsWithRiderCount: NationWithTopRidersAndCount;
}>) {
    const t = useTranslations("tableColumns");

    const rankedNationPoints = rankBy(nationPointsWithRiderCount, "points").slice(0, 17);
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
                {rankedNationPoints.filter(nation => nation.points > 0).map(nation => (
                    <TableRow key={nation.id} isFaded={!nation.active}>
                        <TableCell secondarySpan={{content: rankedActiveNationPoints.find(i => i.id == nation.id)?.rank, inlineBreakpoint: "always"}}>{nation.rank}</TableCell>
                        <NationNameCell nation={nation} isMain/>
                        <TableCell className="hidden sm:table-cell"
                            secondarySpan={{content: nation.rider_active_count, inlineBreakpoint: "always"}}
                        >
                            {nation.rider_count}
                        </TableCell>
                        <TableCell 
                            secondarySpan={{content: formatNumber(nation.active_points / (nation.rider_active_count || 1), 1), inlineBreakpoint: "always"}}
                            className="hidden md:table-cell"
                        >
                            {formatNumber(nation.points / (nation.rider_count || 1), 1)}
                        </TableCell>
                        <TableCell secondarySpan={{content: nation.active_points, inlineBreakpoint: "always"}}>{nation.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}