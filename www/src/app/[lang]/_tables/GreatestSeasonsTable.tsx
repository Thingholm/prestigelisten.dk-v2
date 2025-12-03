import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { GreatestSeasons } from "@/db/seasons";
import { groupResults } from "@/lib/helpers/groupResults";
import { rankBy } from "@/lib/helpers/rank";
import { getGroupedResultNameWithCount } from "@/lib/helpers/resultNames";
import { getRaceUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function GreatestSeasonsTable({
    greatestSeasons,
    pointSystem,
}: Readonly<{
    greatestSeasons: GreatestSeasons;
    pointSystem: PointSystem;
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");

    const rankedGreatestSeasonsWithGroupedResults = rankBy(greatestSeasons.map(i => ({
        ...i,
        results: groupResults(i.results, pointSystem)
    })), "points_for_year");


    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden lg:table-cell">{t("greatestResults")}</TableColumn>
                <TableColumn>{t("season")}</TableColumn>
                <TableColumn className="hidden sm:table-cell">{t("age")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedGreatestSeasonsWithGroupedResults.map(season => (
                    <TableRow key={season.id}>
                        <TableCell>{season.rank}</TableCell>
                        <RiderNameCell rider={season.riders} showFlagBreakpoint="always"/>
                        <TableCell className="hidden lg:table-cell">
                            {season.results.slice(0, 3).map((result, index) => (
                                <span key={result.id}>
                                    <Link href={getRaceUrl(result.races.meta_races)} className="hover:underline">{getGroupedResultNameWithCount(result, tResultNames, true)}</Link>
                                    {index < 2 && ", "}
                                </span>
                            ))}
                        </TableCell>
                        <YearCell year={season.year} />
                        <TableCell className="hidden sm:table-cell">{season.riders.year ? season.year - season.riders.year : "-"}</TableCell>
                        <TableCell>{season.points_for_year}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}