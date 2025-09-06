import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { TeamsWithPoints } from "../_sections/TeamsTablesSection";
import { rankBy } from "@/lib/helpers/rank";
import { getTranslations } from "next-intl/server";
import TeamNameCell from "@/components/table/TeamNameCell";

export default async function TeamsTable({
    teamsWithPoints,
    rankKey
}: Readonly<{
    teamsWithPoints: TeamsWithPoints[]
    rankKey: "pointsForYear" | "pointsAllTime"
}>) {
    const t = await getTranslations("tableColumns");

    const rankedTeams = rankBy(teamsWithPoints, rankKey).filter(team => team[rankKey] > 0);

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("team")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {rankedTeams.map(team => (
                    <TableRow key={team.id}>
                        <TableCell>{team.rank}</TableCell>
                        <TeamNameCell 
                            team={team} 
                            showFlagBreakpoint="always"
                            isMain
                        />
                        <TableCell>{team[rankKey]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}