import { groupResults } from "@/lib/helpers/groupResults"
import TableCell from "./TableCell"
import TableRow from "./TableRow"
import { PointSystem } from "@/db/pointSystem"
import { getGroupedResultName } from "@/lib/helpers/resultNames"
import { useTranslations } from "next-intl"
import ResultNameListItem from "../ResultNameListItem"

type Result = {
    result_type_id: number;
    races: {
        race_class_id: number;
        meta_race_id: number;
        meta_races: {
            id: number
            name: string
        }
    },
    placement: number | null
}

export default function ExpandedResultsRow({
    results,
    pointSystem,
    columns
}: Readonly<{
    results: Result[]
    pointSystem: PointSystem
    columns: number
}>) {
    const t = useTranslations("getResultNames")

    const groupedResults = groupResults(results, pointSystem);

    return (
        <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={columns - 1}>
                <ul>
                    {groupedResults.map((group, index) => (
                        <ResultNameListItem key={index}
                            resultName={getGroupedResultName(group, t, true)}
                            metaRace={group.results[0].races.meta_races}
                            count={group.results.length}
                            points={group.points}
                        />
                    ))}
                </ul>
            </TableCell>
        </TableRow>
    )
}