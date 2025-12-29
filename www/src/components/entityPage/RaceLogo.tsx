"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { getRaceName } from "@/lib/helpers/raceName";
import Link from "next/link";

type MetaRace = {
    id: number;
    name: string;
    images?: {
        credit_url: string | null;
        credit: string | null;
    } | null
}

export default function RaceLogo({
    metaRace
}: Readonly<{
    metaRace: MetaRace
}>) {
    const t = useTranslations("racePage.profile");
    const tResultNames = useTranslations("getResultNames");

    const [noLogo, setNoLogo] = useState(false);
    
        const imgSrc = `https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/race_logos//${metaRace.id}.png`;
        
        if (noLogo) return (
            <div style={{width: 200, height: 200}} className="bg-gray-100 rounded-2xl mb-4 text-center flex items-center overflow-hidden">
                <h2 className="text-pretty font-bold text-2xl text-center w-full">
                    {getRaceName(metaRace, tResultNames)}
                </h2>
            </div>
        )
    
        return(
            <div>
                <Image
                    src={imgSrc}
                    onError={() => setNoLogo(true)}
                    width={200}
                    height={200}
                    alt={`${metaRace.name} logo`}
                    className="rounded-2xl mb-4"
                    style={{height: 200, width: 200}}
                />
                {metaRace.images && 
                    <p className="text-sm text-gray-500 mt-1">
                        <span>{t("source")}: </span>
                        {metaRace.images?.credit_url ? 
                            <Link href={metaRace.images?.credit_url} target="_blank">{metaRace.images?.credit}</Link>
                        :
                            <span>{metaRace.images?.credit}</span>
                        }
                    </p>
                }
            </div>
        )
}