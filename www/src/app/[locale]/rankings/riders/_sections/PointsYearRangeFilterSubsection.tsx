import { Dispatch, SetStateAction } from "react";
import { RidersFilter } from "./ListSection";
import { useTranslations } from "next-intl";
import Select from "@/components/ui/Select";

export default function PointsYearRangeFilterSubsection({
    filter,
    setFilter,
    minSeasonYear,
    maxSeasonYear
}: Readonly<{
    filter: RidersFilter,
    setFilter: Dispatch<SetStateAction<RidersFilter>>,
    minSeasonYear: number,
    maxSeasonYear: number
}>) {
    const t = useTranslations("lists.riders");

    const handleYearRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFilter(s => ({
            ...s,
            yearRange: {
                start: e.target.name == "start-year" ? value : s.yearRange?.start ?? minSeasonYear,
                end: e.target.name == "end-year" ? value : s.yearRange?.end ?? maxSeasonYear,
            }
        }))
    }

    return (
        <div className="gap-2 flex flex-col">
            <div className="gap-2 flex items-center">
                <label htmlFor="start-year">{t("resultsFrom")}</label>
                <Select
                    name="start-year"
                    onChange={handleYearRangeChange}
                    value={filter.yearRange?.start ?? minSeasonYear}
                    className="px-2 py-1 sm:py-0 sm:px-1"
                >
                    {[...Array((filter.yearRange?.end ?? maxSeasonYear) - minSeasonYear + 1)].map((i, index) => {
                        const year = minSeasonYear + index;

                        return (
                            <option 
                                value={year}
                                key={year}
                            >
                                {year}
                            </option>
                        )
                    })}
                </Select>
            </div>
            <div className="gap-2 flex items-center">
                <label htmlFor="end-year" className={`${filter.isSingleYear ? "hidden" : ""}`}> {t("resultsTo")}</label>
                <Select 
                    name="end-year" 
                    onChange={handleYearRangeChange} 
                    className={`${filter.isSingleYear ? "hidden" : ""} px-2 py-1 sm:py-0 sm:px-1`}
                    value={filter.yearRange?.end ?? maxSeasonYear}
                >
                    {[...Array(maxSeasonYear - (filter.yearRange?.start ?? minSeasonYear) + 1)].map((i, index) => {
                        const year = (filter.yearRange?.start ?? minSeasonYear) + index;

                        return (
                            <option 
                                value={year}
                                key={year}
                            >
                                {year}
                            </option>
                        )
                    })}
                </Select>
            </div>
        </div>
    )
}