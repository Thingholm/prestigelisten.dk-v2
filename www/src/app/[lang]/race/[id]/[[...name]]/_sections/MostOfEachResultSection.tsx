"use client";

import Section from "@/components/layout/Section";
import { Result } from "../page";
import { GroupedByKey, GroupedResult } from "@/lib/helpers/groupResults";
import { Tables } from "@/utils/supabase/database.types";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";
import Select from "@/components/ui/Select";
import { ChangeEvent, useState } from "react";
import { getRiderName } from "@/lib/helpers/riderName";
import { NationNameCell, RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow, YearCell } from "@/components/table";
import Button from "@/components/ui/Button";

type GroupedResults = (Omit<GroupedResult<Result>, "results"> & {
  results: GroupedByKey<
    Result,
    Tables<"riders"> & { nations: Tables<"nations"> }
  >[];
})[];

export default function MostOfEachResultSection({
    groupedResults,
    resultTypes
}: Readonly<{
    groupedResults: GroupedResults,
    resultTypes: number[]
}>) {
    const t = useTranslations("racePage.mostOfEachResultTypes")
    const tResultTypes = useTranslations("getResultNames.resultTypes")
    const tTableColumns = useTranslations("tableColumns")

    const [selectedResultType, setSelectedResultType] = useState(resultTypes[0]);
    const [rowAmount, setRowAmount] = useState(20); 

    const resultsForResultType = groupedResults.find(gr => gr.result_type_id == selectedResultType)?.results

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedResultType(parseInt(e.target.value));
        setRowAmount(20);
    }

    return (
        <Section>
            <Container title={t("title")}>
                <label className="block">
                    {t("resultType")}:
                    <Select 
                        value={selectedResultType} 
                        onChange={handleSelectChange}
                        className="mb-4 font-semibold ml-2"
                    >
                        {resultTypes?.map(e => (
                            <option value={e} key={e}>
                                {tResultTypes(e.toString())}
                            </option>
                        ))}
                    </Select>
                </label>
                <Table>
                    <TableHead>
                        <TableColumn>{tTableColumns("amount")}</TableColumn>
                        <TableColumn>{tTableColumns("rider")}</TableColumn>
                        <TableColumn className="hidden sm:table-cell">{tTableColumns("nation")}</TableColumn>
                        <TableColumn>{tTableColumns("year")}</TableColumn>
                        <TableColumn>{tTableColumns("points")}</TableColumn>
                    </TableHead>
                    <TableBody>
                        {resultsForResultType
                            ?.sort((a, b) => a.key.last_name.localeCompare(b.key.last_name))
                            .sort((a, b) => b.points - a.points)
                            .sort((a, b) => b.results.length - a.results.length)
                            .slice(0, rowAmount)
                            .map(result => (
                                <TableRow key={result.key.id}>
                                    <TableCell>{result.results.length}</TableCell>
                                    <RiderNameCell rider={result.key} showFlagBreakpoint="sm"/>
                                    <NationNameCell nation={result.key.nations} className="hidden sm:table-cell"/>
                                    <YearCell year={result.key.year}/>
                                    <TableCell>{result.points}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {rowAmount < (resultsForResultType?.length ?? 0) && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 30)}>{tTableColumns("showMore")}</Button>}
            </Container>
        </Section>
    )
}