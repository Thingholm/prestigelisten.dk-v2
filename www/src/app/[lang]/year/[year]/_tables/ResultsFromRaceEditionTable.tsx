import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { ResultsFromYear } from "@/db/results";
import { getOnlyResultName } from "@/lib/helpers/resultNames";
import { useTranslations } from "next-intl";

export default function ResultsFromRaceEditionTable({
    results,
    pointSystem
}: Readonly<{
    results: ResultsFromYear,
    pointSystem: PointSystem
}>) {
    const t = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("result")}</TableColumn>
                <TableColumn>{t("rider")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("nation")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {results.map(result => (
                    <TableRow key={result.id}>
                        <TableCell className="text-balance max-w-24 sm:max-w-none">{getOnlyResultName(result, tResultNames)}</TableCell>
                        <RiderNameCell rider={result.riders} showFlagBreakpoint="md"/>
                        <NationNameCell nation={result.riders.nations} className="hidden md:table-cell"/>
                        <TableCell>{pointSystem.find(ps => ps.result_type_id == result.result_type_id && ps.race_class_id == result.races.race_class_id)?.points}</TableCell>
                    </TableRow>  
                ))}
            </TableBody>
        </Table>
    )
}