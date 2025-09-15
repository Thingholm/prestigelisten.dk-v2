"use client";

import Section from "@/components/layout/Section";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import ListTable from "../_tables/ListTable";
import { rankBy } from "@/lib/helpers/rank";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function ListSection({
    riderPoints
}: Readonly<{
    riderPoints: RiderPointsWithNationAndTeam
}>) {
    const t = useTranslations("tableColumns");

    const [rowAmount, setRowAmount] = useState(100)
    const rankedAndFilteredRiders = rankBy(riderPoints, "points")

    return (
        <Section>
            <div className="w-full">
                <ListTable riderPoints={rankedAndFilteredRiders} rowAmount={rowAmount}/>
                {rowAmount < rankedAndFilteredRiders.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 100)}>{t("showMore")}</Button>}
            </div>
        </Section>
    )
}