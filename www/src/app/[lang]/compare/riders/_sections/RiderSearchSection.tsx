"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SearchBar, { SearchData } from "@/components/ui/SearchBar";
import { Riders } from "@/db/rider";
import { getRiderName } from "@/lib/helpers/riderName";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function RiderSearchSection({
    riders,
    riderIds
}: Readonly<{
    riders: Riders,
    riderIds: number[]
}>) {
    const t = useTranslations("comparePage.rider");

    const router = useRouter();

    const handleClick = (item: SearchData) => {
        if (riderIds.length > 1) return;
        if (riderIds.includes(item.id)) return;

        const params = new URLSearchParams();

        params.set("riders", [...riderIds, item.id].join(","));

        router.push(`${window.location.pathname}?${params}`)
    } 

    return (
        <Section>
            <Container title={t("title")} className="text-center">
                <SearchBar
                    data={riders.map(rider => ({
                        id: rider.id,
                        value: getRiderName(rider)
                    }))}
                    onClick={handleClick}
                    disabled={riderIds.length > 1}
                />
            </Container>
        </Section>
    )
}