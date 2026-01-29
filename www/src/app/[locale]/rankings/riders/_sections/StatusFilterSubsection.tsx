import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RidersFilter } from "./ListSection";
import { useTranslations } from "next-intl";
import Radio from "@/components/ui/Radio";

export default function StatusFilterSubsection({
    filter,
    setFilter,
}: Readonly<{
    filter: RidersFilter,
    setFilter: Dispatch<SetStateAction<RidersFilter>>,
}>) {
    const t = useTranslations("lists.riders");

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter, 
            status: e.target.value as RidersFilter["status"]
        });
    };

    return (
        <div className="flex flex-col gap-y-1 sm:gap-y-0.5">
            <div className="flex items-center">
                <Radio
                    groupName="status-filter"
                    value="all"
                    onChange={handleStatusChange}
                    checked={"all" == filter.status}
                />
                <label htmlFor="all" className="pl-2">{t("allStatuses")}</label>
            </div>
            <div className="flex items-center">
                <Radio
                    groupName="status-filter"
                    value="active"
                    onChange={handleStatusChange}
                    checked={"active" == filter.status}
                />
                <label htmlFor="active" className="pl-2">{t("activeOnly")}</label>
            </div>
            <div className="flex items-center">
                <Radio
                    groupName="status-filter"
                    value="inactive"
                    onChange={handleStatusChange}
                    checked={"inactive" == filter.status}
                />
                <label htmlFor="inactive" className="pl-2">{t("inactiveOnly")}</label>
            </div>
        </div>
    )
}