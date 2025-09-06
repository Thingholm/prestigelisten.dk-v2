"use client";

import Image from "next/image";
import { useState } from "react";

type Team = {
    id: number;
    name: string;
}

export default function TeamLogo({
    team
}: Readonly<{
    team: Team
}>) {
    const [noLogo, setNoLogo] = useState(false);

    const imgSrc = `https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/team_logos//${team.id}.png`;
    
    if (noLogo) return (
        <div style={{width: 200, height: 200}} className="bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
            <h2 className="text-wrap font-bold text-3xl text-center ">
                {team.name}
            </h2>
        </div>
    )

    return(
        <Image
            src={imgSrc}
            onError={() => setNoLogo(true)}
            width={200}
            height={200}
            alt={`${team.name} logo`}
            className="rounded-2xl mb-4"
            style={{height: 200, width: 200}}
        />
    )
}