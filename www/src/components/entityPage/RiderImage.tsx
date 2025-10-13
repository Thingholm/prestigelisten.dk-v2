"use client";

import { Tables } from "@/data/database.types"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Rider } from "@/db/rider";

type Props = {
    rider: Tables<"riders">;
    className?: string | undefined;
}

export default function RiderImage({ 
    rider 
}: Readonly<{
    rider: Rider
}>) {
    const t = useTranslations("riderPage.profile");
    const [imgSrc, setImgSrc] = useState(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//${rider.id}.jpg`);

    return (
        <div className={`${rider.image_metadata?.[0] ? "sm:pt-5" : ""}`}>
            <Image 
                src={imgSrc} 
                onError={() => setImgSrc(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//nopicture.jpg`)}
                width={200}
                height={200}
                alt={`${rider.first_name} ${rider.last_name} portræt`}
                className="rounded-2xl aspect-square"
                style={{height: 200, width: 200}}
            />
            {rider.image_metadata?.[0] && 
                <p className="text-sm text-gray-500 mt-1">
                    <span>{t("source")}: </span>
                    {rider.image_metadata?.[0].credit_link ? 
                        <Link href={rider.image_metadata?.[0].credit_link} target="_blank">{rider.image_metadata?.[0].credit}</Link>
                    :
                        <span>{rider.image_metadata?.[0].credit}</span>
                    }
                </p>
            }
        </div>
    )
}