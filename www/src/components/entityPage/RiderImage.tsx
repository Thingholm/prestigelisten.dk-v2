"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Rider } from "@/db/rider";
import Link from "next/link";

export default function RiderImage({ 
    rider,
    className
}: Readonly<{
    rider: Rider,
    className?: string
}>) {
    const t = useTranslations("riderPage.profile");
    const [imgSrc, setImgSrc] = useState(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//${rider.id}.jpg`);

    return (
        <div className={`${className}`}>
            <Image
                src={imgSrc} 
                onError={() => setImgSrc(`https://ijyqomzpcigbnwjjohrd.supabase.co/storage/v1/object/public/rider_portraits//nopicture.jpg`)}
                width={200}
                height={200}
                alt={`${rider.first_name} ${rider.last_name} portræt`}
                className="rounded-2xl aspect-square"
                style={!className ? {height: 200, width: 200} : {}}
            />
            {rider.images && 
                <p className="text-sm text-gray-500 mt-1">
                    <span>{t("source")}: </span>
                    {rider.images?.credit_url ? 
                        <Link prefetch={false}  href={rider.images.credit_url} target="_blank">{rider.images.credit}</Link>
                    :
                        <span>{rider.images.credit}</span>
                    }
                </p>
            }
        </div>
    )
}