import { NationNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { useTranslations } from "use-intl";
import { Link } from "@/i18n/navigation";
import { getRiderUrl } from "@/lib/helpers/urls";
import { getRiderName } from "@/lib/helpers/riderName";
import { Ranked } from "@/lib/helpers/rank";
import { NationPointsWithRidersAndCount } from "../_sections/ListSection";

export default function NationsTable({
    nationPoints
}: Readonly<{
    nationPoints: Ranked<NationPointsWithRidersAndCount>[]
}>) {
    const t = useTranslations("tableColumns")

    return (
        <Table className="w-full">
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn className="min-w-32">{t("nation")}</TableColumn>
                <TableColumn className="hidden md:table-cell">{t("greatestRiders")}</TableColumn>
                <TableColumn>{t("numberOfRiders")}</TableColumn>
                <TableColumn>{t("pointsPerRider")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {nationPoints.map(nation => (
                    <TableRow key={nation.id} isFaded={!nation.active}>
                        <TableCell>{nation.rank}</TableCell>
                        <NationNameCell 
                            nation={nation} 
                            className="text-nowrap"
                            isMain 
                        />
                        <TableCell className="hidden md:table-cell">
                            {nation.riders.map((rider, index) => (
                                <Link prefetch={false}  
                                    href={getRiderUrl(rider)} 
                                    className="hover:underline"
                                    key={rider.id}
                                >
                                    {`${index != 0 ? ", " : ""}${getRiderName(rider)}`}
                                </Link>
                            ))}
                        </TableCell>
                        <TableCell>{nation.rider_count}</TableCell>
                        <TableCell>{nation.points_per_rider}</TableCell>
                        <TableCell>{nation.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}