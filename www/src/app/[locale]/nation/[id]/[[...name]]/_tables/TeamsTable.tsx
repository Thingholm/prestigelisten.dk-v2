"use client";

import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow, TeamNameCell } from "@/components/table";
import Button from "@/components/ui/Button";
import { TeamFromNation } from "@/db/team";
import { rankBy } from "@/lib/helpers/rank";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TeamsTable({
    teams
}: Readonly<{
    teams: TeamFromNation[]
}>) {
    const t = useTranslations("tableColumns");

    const [rowAmount, setRowAmount] = useState(20);

    const rankedTeams = rankBy(
        teams.map(team => ({
            ...team,
            points: team.riders.flatMap(rider => rider.points).reduce((acc, obj) => acc + obj, 0)
        })).filter(team => team.points > 0),
        "points"
    )
    
    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>{t("team")}</TableColumn>
                    <TableColumn>{t("totalPointsCurrentRiders")}</TableColumn>
                </TableHead>
                <TableBody>
                    {rankedTeams.map(team => (
                        <TableRow key={team.id}>
                            <TeamNameCell team={team}/>
                            <TableCell>{team.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {rowAmount < teams.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{t("showMore")}</Button>}
        </div>
        
    )
}