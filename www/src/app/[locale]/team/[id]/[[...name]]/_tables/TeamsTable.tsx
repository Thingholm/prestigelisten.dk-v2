import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { TeamsWithPoints } from "../_sections/TeamsTablesSection";
import { Ranked } from "@/lib/helpers/rank";
import { getTranslations } from "next-intl/server";
import TeamNameCell from "@/components/table/TeamNameCell";

export default async function TeamsTable({
    teamId,
    rankedTeams,
    rankKey
}: Readonly<{
    teamId: number
    rankedTeams: Ranked<TeamsWithPoints>[]
    rankKey: "pointsForYear" | "pointsAllTime"
}>) {
    const t = await getTranslations("tableColumns");

    const slicedTeams = rankedTeams.slice(0, 15);
    let currentTeam = rankedTeams.find(team => team.id == teamId);

    if (currentTeam?.[rankKey] == 0) {
        currentTeam = undefined;
    }

    const isCurrentTeamInSlicedList = currentTeam ? slicedTeams.includes(currentTeam) : false;

    if (!isCurrentTeamInSlicedList && currentTeam) {
        slicedTeams.splice(14, 1, currentTeam);
    }

    return (
        <Table>
            <TableHead>
                <TableColumn>{t("no")}</TableColumn>
                <TableColumn>{t("team")}</TableColumn>
                <TableColumn>{t("points")}</TableColumn>
            </TableHead>
            <TableBody>
                {slicedTeams.filter(team => team[rankKey] > 0).map(team => (
                    <TableRow key={team.id} isHighlighted={team.id == teamId}>
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