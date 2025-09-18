import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RidersFilter } from "./ListSection";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function NationsFilterSubsection({
    filter,
    setFilter,
    nations
}: Readonly<{
    filter: RidersFilter,
    setFilter: Dispatch<SetStateAction<RidersFilter>>,
    nations: Tables<"nations">[]
}>) {
    const t = useTranslations("lists.riders");

    const handleNationChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        let newNationsFilter = filter.nations;
        
        const value = e.target.value == "undefined" ? undefined : parseInt(e.target.value)

        if (newNationsFilter) {
            newNationsFilter[index] = value;
        } else {
            newNationsFilter = [parseInt(e.target.value)]
        }

        setFilter(s => ({
            ...filter,
            nations: newNationsFilter
        }))
    }

    const handleRemoveNation = (index: number) => {
        const newNationsFilter = filter.nations.filter((_, filterIndex) => filterIndex != index);

        setFilter(({
            ...filter,
            nations: newNationsFilter
        }))
    }

    const handleAddNation = () => {
        setFilter({
            ...filter,
            nations: [...filter.nations, undefined]
        })
    }


    return (
        <div className="flex flex-col gap-y-1">
            <label>{t("nationality")}</label>
            {(Array.isArray(filter.nations) ? filter.nations : [undefined]).map((_, index) => {
                return (
                    <div key={index} className="flex items-center">
                        <Select
                            onChange={e => handleNationChange(e, index)}
                            value={filter.nations?.[index] ?? "undefined"}
                        >
                            <option value="undefined">{filter.nations?.length > 1 ? t("selectNation") : t("allNations")}</option>
                            {nations.map(nation => {
                                return (
                                    <option key={nation.id} value={nation.id}>
                                        {nation.name}
                                    </option>
                                )
                            })}
                        </Select>
                        {index > 0 
                            ? <Button 
                                variant="text" 
                                color="secondary" 
                                className="!py-1 !px-3 ml-1"
                                onClick={() => handleRemoveNation(index)}
                            >
                                <IoRemoveCircleOutline />
                            </Button>
                            : <div className="w-10 ml-1 invisible">.</div>
                        }
                    </div>
                )
            })}
            <Button className="!py-1 w-[calc(100%-44px)]" onClick={handleAddNation} color="gray">+ {t("addNation")}</Button>
        </div>
    )
}