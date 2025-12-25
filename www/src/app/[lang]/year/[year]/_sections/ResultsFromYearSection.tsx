"use client";

import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import Select from "@/components/ui/Select"
import { PointSystem } from "@/db/pointSystem"
import { ResultsFromYear } from "@/db/results"
import { getRaceName } from "@/lib/helpers/raceName";
import { sortResults } from "@/lib/helpers/results";
import { useTranslations } from "next-intl"
import { ChangeEvent, useState } from "react";
import ResultsFromRaceEditionTable from "../_tables/ResultsFromRaceEditionTable";

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
    .sort((a, b) => (a.race_classes?.sorting_index ?? 0) - (b.race_classes?.sorting_index ?? 0));

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
                <ResultsFromRaceEditionTable results={sortResults(resultsFromYear.filter(result => result.race_id == selectedRace.id))} pointSystem={pointSystem}/>
            </Container>
        </Section>
    )
}