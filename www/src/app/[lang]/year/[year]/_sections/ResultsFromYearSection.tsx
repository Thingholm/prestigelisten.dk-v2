"use client";

import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import FlagSpan from "@/components/table/FlagSpan";
import Select from "@/components/ui/Select"
import { PointSystem } from "@/db/pointSystem"
import { ResultsFromYear } from "@/db/results"
import { getRaceName } from "@/lib/helpers/raceName";
import { getGroupedResultName, getOnlyResultName } from "@/lib/helpers/resultNames";
import { getResultTypeSortValue } from "@/lib/helpers/resultType";
import { getRiderName } from "@/lib/helpers/riderName";
import { getRiderUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl"
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function ResultsFromYearSection({
    year,
    resultsFromYear,
    pointSystem
}: Readonly<{
    year: number
    resultsFromYear: ResultsFromYear
    pointSystem: PointSystem
}>) {
    const t = useTranslations("yearPage");
    const tResultNames = useTranslations("getResultNames");

    const races = resultsFromYear.reduce((acc: ResultsFromYear[number]["races"][], obj) => {
        const racesAcc = acc ?? []

        if (!racesAcc.some(race => race.id == obj.race_id)) {
            racesAcc.push(obj.races);
        }

        return racesAcc;
    }, [])
    .sort((a, b) => a.meta_races.name.localeCompare(b.meta_races.name))
    .sort((a, b) => a.race_classes.sorting_index - b.race_classes.sorting_index);

    const [selectedRace, setSelectedRace] = useState<ResultsFromYear[number]["races"]>(races[0]);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const targetRace = races.find(race => race.id == parseInt(e.target.value));

        if (targetRace) setSelectedRace(targetRace)
    }

    return (
        <Section>
            <Container title={t("titles.resultsFromYear", {year: year})}>
                <Select 
                    value={selectedRace.id} 
                    onChange={handleSelectChange}
                    className="mb-2 py-1 px-2"
                >
                    {races.map(race => (
                        <option key={race.id} value={race.id}>{getRaceName(race.meta_races, tResultNames)}</option>
                    ))}
                </Select>
                <ul className="gap-0.5 flex flex-col">
                    {resultsFromYear
                        .filter(result => result.race_id == selectedRace.id)
                        .sort((a, b) => (a.placement ?? 0) - (b.placement ?? 0))
                        .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0))
                        .sort((a, b) => getResultTypeSortValue(a.result_type_id) - getResultTypeSortValue(b.result_type_id))
                        .map(result => (
                            <li>
                                <span>{getOnlyResultName(result, tResultNames)} - </span>
                                <Link href={getRiderUrl(result.riders)} className="hover:underline">
                                    <FlagSpan code={result.riders.nations.code} className="mr-2"/> 
                                    {getRiderName(result.riders)}
                                </Link>
                                <span> - </span>
                                <span className="opacity-40">{pointSystem.find(ps => ps.result_type_id == result.result_type_id && ps.race_class_id == result.races.race_class_id)?.points}p</span>
                            </li>
                        ))
                    }
                </ul>
            </Container>
        </Section>
    )
}