"use client";

import React, { useRef, useState } from "react";
import TwitterCard from "./TwitterCard";
import Toolbox from "./Toolbox";
import handleSnapshot from "@/lib/helpers/snapshot";
import { Rider } from "@/lib/db/riders";
import { Tables } from "@/lib/supabase/database.types";
import { Button } from "../ui/button";
import { RankingEvolution } from "@/app/dashboard/some-images/[id]/page";
import InstagramCard from "./InstagramCard";

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
    riderPoints: Tables<"riders">[],
    pointSystem: Tables<"point_system">[],
}>) {
    const refEn = useRef<HTMLDivElement>(null);
    const refDa = useRef<HTMLDivElement>(null);

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
        <div className="flex justify-evenly flex-wrap items-center gap-y-8 my-8">
            <div className="grid gap-4">
                <TwitterCard 
                    rider={rider} 
                    rankingEvolutions={rankingEvolutions} 
                    settings={settings}
                    ref={refEn as React.RefObject<HTMLDivElement>}
                    riderPoints={riderPoints}
                    pointSystem={pointSystem}
                    locale="en"
                />

                <TwitterCard 
                    rider={rider} 
                    rankingEvolutions={rankingEvolutions} 
                    settings={settings}
                    ref={refDa as React.RefObject<HTMLDivElement>}
                    riderPoints={riderPoints}
                    pointSystem={pointSystem}
                    locale="da"
                />
            </div>
            <div className="flex flex-col gap-y-2">      
                <Toolbox
                    settings={settings}
                    setSettings={setSettings}
                    rider={rider}
                    rankingEvolutions={rankingEvolutions}
                />
                <div className="flex flex-col gap-y-2">
                    <Button onClick={() => handleSnapshot(refEn as React.RefObject<HTMLDivElement>, rider.id, false, "en")}>Download</Button>
                    <Button onClick={() => handleSnapshot(refEn as React.RefObject<HTMLDivElement>, rider.id, true, "en")}>Upload</Button>
                    {/* <Button href={`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/${locale}_twitter-images/${rider.id}.png`} target="_blank">Revalidér billede</Button> */}
                </div>
            </div>
        </div>
    )
}