"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

type MetaRace = {
    id: number;
    name: string;
    image_metadata?: {
        credit_link: string | null;
        credit: string | null;
    }[] | null
}

export default function RaceLogo({
    metaRace
}: Readonly<{
    metaRace: MetaRace
}>) {
    const t = useTranslations("racePage.profile");
    const [noLogo, setNoLogo] = useState(false);
    
        const imgSrc = `https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/race_logos//${metaRace.id}.png`;
        
        if (noLogo) return (
            <div style={{width: 200, height: 200}} className="bg-gray-100 rounded-2xl mb-4 text-center flex items-center overflow-hidden">
                <h2 className="text-wrap font-bold text-3xl text-center w-full">
                    {metaRace.name}
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
                {metaRace.image_metadata?.[0] && 
                    <p className="text-sm text-gray-500 mt-1">
                        <span>{t("source")}: </span>
                        {metaRace.image_metadata?.[0].credit_link ? 
                            <Link href={metaRace.image_metadata?.[0].credit_link} target="_blank">{metaRace.image_metadata?.[0].credit}</Link>
                        :
                            <span>{metaRace.image_metadata?.[0].credit}</span>
                        }
                    </p>
                }
            </div>
        )
}