"use client";

import Section from "@/components/layout/Section"
import { PointSystem } from "@/db/pointSystem"
import { Riders3YearRollingRankingsWithResults } from "@/db/riders3YearRollingRankings"
import { useTranslations } from "next-intl"
import GreatestRidersEachSpanTable from "../_tables/GreatestRidersEachSpanTable"
import Select from "@/components/ui/Select"
import { ChangeEvent } from "react"
import { useRouter } from "next/navigation";

export default function GreatestRidersEachSpanSection({
    riderRankingsForSpan,
    pointSystem,
    firstResultYear,
    spanEndYear
}: Readonly<{
    riderRankingsForSpan: Riders3YearRollingRankingsWithResults[],
    pointSystem: PointSystem,
    firstResultYear: number,
    spanEndYear: number
}>) {
    const currentYear = new Date().getFullYear();

    const t = useTranslations("lists.riders3YearSpans");

    const router = useRouter();

    const handleSpanChange = (e: ChangeEvent<HTMLSelectElement>) => {
        router.push(`${window.location.pathname}?spanEndYear=${e.target.value}`)
    }

    return (
        <Section className="flex-col">
            <div className="flex items-center mb-2 gap-2 font-semibold">
                <p>{t("span")}: </p>
                <Select
                    onChange={handleSpanChange}
                    value={spanEndYear}
                >
                    {[...Array(currentYear - firstResultYear + 1)].map((_, index) => {
                        const year = currentYear - index;

                        return (
                            <option 
                                value={year}
                                key={year}
                            >
                                {year - 2}-{year}
                            </option>
                        )
                    })}
                </Select>
            </div>
            <GreatestRidersEachSpanTable riderRankingsForSpan={riderRankingsForSpan} pointSystem={pointSystem}/>
        </Section>
    )
}