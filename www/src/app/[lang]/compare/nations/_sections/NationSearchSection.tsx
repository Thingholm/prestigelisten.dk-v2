"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SearchBar, { SearchData } from "@/components/ui/SearchBar";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NationSearchSection({
    nations,
    nationIds
}: Readonly<{
    nations: {id: number, code: string}[],
    nationIds: number[]
}>) {
    const t = useTranslations("comparePage.nation");
    const tNations = useTranslations("nations")

    const router = useRouter();

    const handleClick = (item: SearchData) => {
        if (nationIds.length > 1) return;
        if (nationIds.includes(item.id)) return;

        const params = new URLSearchParams();

        params.set("nations", [...nationIds, item.id].join(","));

        router.push(`${window.location.pathname}?${params}`)
    } 

    return (
        <Section>
            <Container title={t("title")} className="text-center">
                <SearchBar
                    data={nations.map(nation => ({
                        id: nation.id,
                        value: tNations(`${nation.code}.name`)
                    }))}
                    onClick={handleClick}
                    disabled={nationIds.length > 1}
                />
            </Container>
        </Section>
    )
}