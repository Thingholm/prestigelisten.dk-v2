"use client";

import Section from "@/components/layout/Section"
import Select from "@/components/ui/Select";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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
        <Section className="pb-0!">
            <label>
                <span className="font-medium text-xl mr-1">{t("year")}</span>
                <Select
                    value={curYear}
                    onChange={e => router.push({ pathname: "/year/[year]", params: { year: e.target.value } })}
                    className="mb-4 font-semibold text-lg"
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