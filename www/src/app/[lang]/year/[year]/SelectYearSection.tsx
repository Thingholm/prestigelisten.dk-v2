"use client";

import Section from "@/components/layout/Section"
import Select from "@/components/ui/Select";
import { getYearUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation"

export default function SelectYearSection({
    curYear,
    minYear,
    maxYear
}: Readonly<{
    curYear: number,
    minYear: number,
    maxYear: number
}>) {
    const router = useRouter();
    const t = useTranslations("yearPage");

    return (
        <Section>
            <label>
                <span className="font-medium text-lg mr-1">{t("year")}</span>
                <Select
                    value={curYear}
                    onChange={e => router.push(`${getYearUrl()}/${e.target.value}`)}
                    className="mb-4 font-semibold"
                >
                    {Array.from({ length: maxYear - minYear + 1}, (_, index) => maxYear - index).map(year => (
                        <option value={year} key={year}>
                            {year}
                        </option>
                    ))}
                </Select>
            </label>
        </Section>
    )
}