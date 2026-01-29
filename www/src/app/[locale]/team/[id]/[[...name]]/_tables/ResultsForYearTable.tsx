import { RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table"
import FlagSpan from "@/components/table/FlagSpan"
import { getDateString } from "@/lib/helpers/dateFormatter"
import { getRaceFlagCode } from "@/lib/helpers/raceFlags"
import { getGroupedResultName } from "@/lib/helpers/resultNames"
import { getRiderName } from "@/lib/helpers/riderName"
import { getRaceUrl, getRiderUrl } from "@/lib/helpers/urls"
import { Tables } from "@/utils/supabase/database.types"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
type ResultsWithPoints = Tables<"results"> & { 
    points: number, 
    riders: Tables<"riders"> & {
        nations?: Tables<"nations">
    }
    races: Tables<"races"> & {
        meta_races: Tables<"meta_races"> & {
            nations: Tables<"nations"> | null
        }
    },
    race_dates: Tables<"race_dates"> | null
}

export default function ResultsForYearTable({
    resultsWithPoints,
}: Readonly<{
    resultsWithPoints: ResultsWithPoints[]
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");
    const locale = useLocale();

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("points")}</TableColumn>
                <TableColumn>
                    {t("result")}
                    <SecondaryCellSpan breakpoint="md" isColumn>
                        {t("rider")}
                    </SecondaryCellSpan>
                </TableColumn>
                <TableColumn className="hidden md:table-cell">{t("rider")}</TableColumn>
                <TableColumn>{t("date")} <SecondaryCellSpan isColumn>{t("dateFormatNoYear")}</SecondaryCellSpan></TableColumn>
            </TableHead>
            <TableBody>
                {resultsWithPoints
                    .sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
                    .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
                                        .sort((a, b) => {
                        const dateA = new Date(a.race_dates?.date ?? 0);
                        const dateB = new Date(b.race_dates?.date ?? 0);
                        return dateB.getTime() - dateA.getTime();
                    })   
                    .sort((a, b) => b.points - a.points)
                    .map(result => (
                        <TableRow key={result.id}>
                            <TableCell>{result.points}</TableCell>
                            <TableCell>
                                <Link href={getRaceUrl(result.races.meta_races)} className="hover:underline font-semibold">
                                    <FlagSpan code={getRaceFlagCode(result.races.meta_races)} className="!hidden md:table-cell!"/>
                                    <span className="md:ml-1">{getGroupedResultName(result, tResultNames)}</span>
                                </Link>
                                <SecondaryCellSpan breakpoint="md">
                                    <FlagSpan code={result.riders.nations?.code} className="mr-1"/>
                                    <Link href={getRiderUrl(result.riders)}>{getRiderName(result.riders)}</Link>
                                </SecondaryCellSpan>
                            </TableCell>
                            <RiderNameCell rider={result.riders} showFlagBreakpoint="always" className="hidden md:table-cell"/>
                            <TableCell className="text-nowrap">{getDateString(result.race_dates?.date, locale)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}