import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { Riders3YearRollingRankings } from "@/db/riders3YearRollingRankings";
import { getMovement } from "@/lib/helpers/movement";
import { useTranslations } from "next-intl";

export default function Riders3YearRollingRankingsTable({
    riders3YearRollingRankings
}: Readonly<{
    riders3YearRollingRankings: Riders3YearRollingRankings[]
}>) {
    const t = useTranslations("tableColumns");

    const rows = Array.from({ length: 10 }, (_, index) => index + 1);
        const columns = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);
    
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
                        {columns.map(year => (
                            <TableColumn key={`${year}-col`}>
                                {`${year - 2}-${year}`}
                            </TableColumn>                        
                        ))}
                    </TableHead>
                    <TableBody>
                        {rows.map((rank, index) => (
                            <TableRow key={`${rank}-tablerow`}>
                                {columns.map(year => {
                                    const rider3YearSpan = riders3YearRollingRankings
                                        .filter(i => i.year == year)
                                        .sort((a, b) => b.points_last_3_years - a.points_last_3_years)[index];
    
                                    const movement = getMovement(rider3YearSpan.rank_for_3_year_span, riders3YearRollingRankings.find(i => i.rider_id == rider3YearSpan.rider_id && i.year == year - 1)?.rank_for_3_year_span ?? 11)
                                    
                                    return (
                                        <RiderNameCell 
                                            key={`${rider3YearSpan.rider_id}-${year}`} 
                                            rider={rider3YearSpan.riders} 
                                            showFlagBreakpoint="always"
                                            className="text-nowrap flex-nowrap !pr-12"
                                            movement={movement}
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