"use client";

import NavigatorSection from "@/components/NavigatorSection";
import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { PointSystem } from "@/db/pointSystem";
import { getResultPoints } from "@/lib/helpers/pointSystem";
import { getOnlyResultName } from "@/lib/helpers/resultNames";
import { sortResults } from "@/lib/helpers/results";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Result } from "../page";

export default function EditionsResultsSection({
    results,
    pointSystem
}: Readonly<{
    results: Result[],
    pointSystem: PointSystem
}>) {
    const t = useTranslations("racePage.resultsEachEdition")
    const tRaceClasses = useTranslations("raceClasses")
    const tTableColumns = useTranslations("tableColumns")
    const tResultNames = useTranslations("getResultNames")

    const resultYears = Array.from(new Set(results.map(r => r.year))).sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = useState(resultYears[0])

    const resultsForYear = results.filter(result => result.year == selectedYear);

    return (
        <NavigatorSection
            options={resultYears}
            selectedOption={selectedYear}
            setSelectedOption={setSelectedYear}
            title={t("title")}
        >
            <p className="mb-4">
                <span>{t("pointClassForEdition")}: </span>
                <Link href={{ pathname: "/point_scale" }} className="font-semibold hover:underline">
                    {tRaceClasses(resultsForYear[0].races.race_class_id.toString())}
                </Link>
            </p>

            <Table className="lg:w-[600px]">
                <TableHead>
                    <TableColumn>{tTableColumns("result")}</TableColumn>
                    <TableColumn>{tTableColumns("rider")}</TableColumn>
                    <TableColumn className="hidden sm:table-cell">{tTableColumns("points")}</TableColumn>
                </TableHead>
                <TableBody>
                    {sortResults(resultsForYear).map(result => (
                        <TableRow key={result.id}>
                            <TableCell className="pr-2! sm:pr-6!">{getOnlyResultName(result, tResultNames, false)}</TableCell>
                            <RiderNameCell 
                                rider={result.riders} 
                                showFlagBreakpoint="always"
                                className="pr-1! sm:pr-6!"
                            />
                            <TableCell className="hidden sm:table-cell">{getResultPoints(result, pointSystem)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </NavigatorSection>
    )
}