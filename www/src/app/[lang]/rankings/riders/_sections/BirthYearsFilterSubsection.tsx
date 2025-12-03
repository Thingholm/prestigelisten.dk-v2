import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RidersFilter } from "./ListSection";
import { useTranslations } from "use-intl";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";

export default function BirthYearsFilterSubsection({
    filter,
    setFilter,
    minBirthYear,
    maxBirthYear
}: Readonly<{
    filter: RidersFilter,
    setFilter: Dispatch<SetStateAction<RidersFilter>>,
    minBirthYear: number,
    maxBirthYear: number
}>) {
    const t = useTranslations("lists.riders");

    const handleBirthYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(s => ({
            ...s,
           [(e.target.name == "born-before-or-in" ? "bornBeforeOrIn" : "bornAfterOrIn")]: parseInt(e.target.value)
        }))
    }

    return (
        <div>
            <div className="flex items-center mb-2 pb-2 border-b border-secondary">
                <Toggle
                    label={t("singleYear")}
                    isEnabled={filter.isSingleYear}
                    onToggle={() => setFilter(s => ({...s, isSingleYear: !s.isSingleYear}))}
                />
            </div>
            <div className="gap-2 flex flex-col">
                <div className="gap-2 flex">
                    <label htmlFor="born-before-or-in">{t("bornIn")}<span className={filter.isSingleYear ? "hidden" : ""}> {t("orBefore")}</span></label>
                    <Select
                        name="born-before-or-in"
                        onChange={handleBirthYearChange}
                        value={filter.bornBeforeOrIn}
                    >
                        {[...Array(maxBirthYear - filter.bornAfterOrIn + 1)].map((i, index) => {
                            const year = maxBirthYear - index;

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
                <div className="gap-2 flex">
                    <label htmlFor="born-after-or-in" className={`${filter.isSingleYear ? "hidden" : ""}`}> {t("bornIn")} {t("orAfter")}</label>
                    <Select 
                        name="born-after-or-in" 
                        onChange={handleBirthYearChange} 
                        disabled={filter.isSingleYear ? true : false} 
                        className={filter.isSingleYear ? "hidden" : ""}
                        value={filter.bornAfterOrIn}
                    >
                        {[...Array(filter.bornBeforeOrIn - minBirthYear + 1)].map((i, index) => {
                            const year = minBirthYear + index;


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
        </div>
    )
}