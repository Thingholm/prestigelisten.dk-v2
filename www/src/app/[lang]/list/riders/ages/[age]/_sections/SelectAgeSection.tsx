"use client";

import Section from "@/components/layout/Section"
import Select from "@/components/ui/Select";
import { urls } from "@/lib/constants/urls";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation"

export default function SelectAgeSection({
    selectedAge,
    minAge,
    maxAge
}: Readonly<{
    selectedAge: number,
    minAge: number,
    maxAge: number
}>) {
    const t = useTranslations("lists.riderAge");

    const router = useRouter();

    return (
        <Section className="!pb-0">
            <label>
                <span className="font-medium text-lg mr-1">{t("selectAge")}</span>
                <Select
                    value={selectedAge}
                    onChange={e => router.push(`${urls["listRidersAges"]}/${e.target.value}`)}
                    className="mb-4 font-semibold text-lg"
                >
                    {Array.from({ length: maxAge - minAge + 1}, (_, index) => minAge + index).map(age => (
                        <option value={age} key={age}>
                            {age}
                        </option>
                    ))}
                </Select>
            </label>
        </Section>
    )
}