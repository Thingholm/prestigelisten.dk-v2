import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { Top10AlltimeEachSeason } from "@/db/seasons";
import { getMovement } from "@/lib/helpers/movement";
import { useTranslations } from "next-intl";

export default function TopAlltimeEachSeasonTable({
    top10AlltimeEachSeason
}: Readonly<{
    top10AlltimeEachSeason: Top10AlltimeEachSeason
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
                            {year}
                        </TableColumn>                        
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((rank, index) => (
                        <TableRow key={`${rank}-tablerow`}>
                            {columns.map(year => {
                                const riderSeason = top10AlltimeEachSeason
                                    .filter(i => i.year == year)
                                    .sort((a, b) => b.points_all_time - a.points_all_time)[index];

                                const movement = getMovement(riderSeason.rank_all_time, top10AlltimeEachSeason.find(i => i.rider_id == riderSeason.rider_id && i.year == year - 1)?.rank_all_time ?? 11)
                                
                                return (
                                    <RiderNameCell 
                                        key={riderSeason.id} 
                                        rider={riderSeason.riders} 
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