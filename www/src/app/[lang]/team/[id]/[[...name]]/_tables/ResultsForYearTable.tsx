import { RiderNameCell, SecondaryCellSpan, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table"
import FlagSpan from "@/components/table/FlagSpan"
import { formatDate } from "@/lib/helpers/dateFormatter"
import { getRaceFlagCode } from "@/lib/helpers/raceFlags"
import { getGroupedResultName } from "@/lib/helpers/resultNames"
import { getRaceUrl } from "@/lib/helpers/urls"
import { Tables } from "@/utils/supabase/database.types"
import { useTranslations } from "next-intl"
import Link from "next/link"

type ResultsWithPoints = Tables<"results"> & { 
    points: number, 
    riders: Tables<"riders"> 
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
                <TableColumn>{t("date")}</TableColumn>
            </TableHead>
            <TableBody>
                {resultsWithPoints
                    .sort((a, b) => b.points - a.points)
                    .sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
                    .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
                    .sort((a, b) => {
                        const dateA = new Date(a.race_dates?.date ?? 0);
                        const dateB = new Date(b.race_dates?.date ?? 0);
                        return dateB.getTime() - dateA.getTime();
                    })                    
                    .map(result => (
                        <TableRow key={result.id}>
                            <TableCell>{result.points}</TableCell>
                            <TableCell>
                                <Link href={getRaceUrl(result.races.meta_races)} className="hover:underline font-semibold">
                                    <FlagSpan code={getRaceFlagCode(result.races.meta_races)}/>
                                    {getGroupedResultName(result, tResultNames)}
                                </Link>
                                <SecondaryCellSpan breakpoint="md">
                                    <RiderNameCell rider={result.riders} isCell={false}/>
                                </SecondaryCellSpan>
                            </TableCell>
                            <RiderNameCell rider={result.riders} showFlagBreakpoint="always" className="hidden md:table-cell"/>
                            <TableCell className="text-nowrap">{formatDate(result.race_dates?.date)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}