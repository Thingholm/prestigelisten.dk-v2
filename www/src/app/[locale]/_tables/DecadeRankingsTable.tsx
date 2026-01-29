import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { DecadeRanking } from "@/db/decade";
import { getTranslations } from "next-intl/server";

export default async function DecadeRankingsTable({
    decadeRankings,
}: Readonly<{
    decadeRankings: DecadeRanking[]
}>) {
    const t = await getTranslations("tableColumns");

    const rows = Array.from({ length: 10 }, (_, index) => index + 1);
    const columns = [...new Set(decadeRankings.map(ranking => ranking.decade_start))].sort((a,b) => b - a);

    return (
        <div className="flex">
            <Table className="inline-table !w-fit">
                <TableHead>
                    <TableColumn className="pr-6">
                        {t("no")}
                    </TableColumn>
                </TableHead>
                <TableBody>
                    {rows.map(rank => (
                        <TableRow key={rank}>
                            <TableCell>
                                {rank}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table horisontal>
                <TableHead>
                    {columns.map(decade => (
                        <TableColumn key={`${decade}-col`}>
                            {decade}
                        </TableColumn>                        
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((_, index) => (
                        <TableRow key={`${index}-tablerow`}>
                            {columns.map(decade => {
                                const rider = decadeRankings
                                    .filter(i => i.decade_start == decade)
                                    .sort((a, b) => b.points - a.points)[index];           
                                                         
                                return (
                                    <RiderNameCell 
                                        key={`${rider.rider_id}-${decade}`} 
                                        rider={{
                                            id: rider.rider_id,
                                            first_name: rider.first_name,
                                            last_name: rider.last_name,
                                            nations: {
                                                code: rider.nation_code
                                            }
                                        }} 
                                        showFlagBreakpoint="always"
                                        className="text-nowrap flex-nowrap !pr-12"
                                    />
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}