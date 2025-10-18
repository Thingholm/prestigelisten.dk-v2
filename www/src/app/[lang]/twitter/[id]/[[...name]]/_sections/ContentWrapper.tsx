"use client";

import { Rider } from "@/db/rider";
import { RankingEvolution } from "@/lib/helpers/rankingEvolution";
import React, { useRef, useState } from "react";
import TwitterCard from "./TwitterCard";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { PointSystem } from "@/db/pointSystem";

export type Settings = {
    textSize: number;
    showAllTimeRanking: boolean;
    showActiveRanking: boolean;
    showNationsRanking: boolean;
    showBirthYearRanking: boolean;
    showActiveRankingTable: boolean;
    colorHex: string;
    whiteText: boolean;
    showLatestResult: boolean;
    sortResultsBy: "accumulated" | "isolated";
}

export default function ContentWrapper({
    rankingEvolutions,
    rider,
    riderPoints,
    pointSystem
}: Readonly<{
    rankingEvolutions:  RankingEvolution[] | null,
    rider: Rider,
    riderPoints: RiderPointsWithNationAndTeam,
    pointSystem: PointSystem
}>) {
    const ref = useRef<HTMLDivElement>(null);

    const [settings, setSettings] = useState<Settings>({
        textSize: 36,
        showAllTimeRanking: true,
        showActiveRanking: rider.active ? true : false,
        showNationsRanking: true,
        showBirthYearRanking: true,
        showActiveRankingTable: rider.active ? true : false,
        colorHex: "#D1D5DB",
        whiteText: false,
        showLatestResult: rankingEvolutions != null,
        sortResultsBy: "isolated",
    });
    
    return (
        <div className="flex justify-evenly flex-wrap items-center w-screen gap-y-8 my-8">
            <TwitterCard 
                rider={rider} 
                rankingEvolutions={rankingEvolutions} 
                settings={settings}
                ref={ref as React.RefObject<HTMLDivElement>}
                riderPoints={riderPoints}
                pointSystem={pointSystem}
            />
        </div>
    )
}