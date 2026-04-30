"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Rider } from "@/lib/db/riders";
import { useT } from "@/lib/helpers/translations";

export default function RiderImage({ 
    rider,
    className,
    size = 200,
}: Readonly<{
    rider: Rider,
    className?: string,
    size?: number,
}>) {
    const t = useT("riderPage.profile", "en");
    const [imgSrc, setImgSrc] = useState(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//${rider.id}.jpg`);

    return (
        <div className={`${className} flex-shrink-0`}>
            <Image
                src={imgSrc} 
                onError={() => setImgSrc(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//nopicture.jpg`)}
                width={size}
                height={size}
                alt={`${rider.first_name} ${rider.last_name} portræt`}
                className="rounded-2xl aspect-square"
                style={{height: size, width: size}}
            />
            {rider.images && 
                <p className="text-sm text-gray-500 mt-1">
                    <span>{t("source")}: </span>
                    {rider.images?.credit_url ? 
                        <Link href={rider.images.credit_url} target="_blank">{rider.images.credit}</Link>
                    :
                        <span>{rider.images.credit}</span>
                    }
                </p>
            }
        </div>
    )
}