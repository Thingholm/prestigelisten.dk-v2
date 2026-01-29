import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { NationsFilter } from "./ListSection";
import Radio from "@/components/ui/Radio";
import { useTranslations } from "next-intl";

export default function FilterSubsection({
    filter,
    setFilter
}: Readonly<{
    filter: NationsFilter,
    setFilter: Dispatch<SetStateAction<NationsFilter>>
}>) {
    const t = useTranslations("lists.nations");

    const handleRankByChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter, 
            RankBy: e.target.value as NationsFilter["RankBy"]
        });
    };

    const handleFilterByChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter, 
            FilterBy: e.target.value as NationsFilter["FilterBy"]
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 gap-x-20 lg:justify-between lg:items-center">
            <div>
                <p className="font-medium mb-2">{t("sortBy")}</p>
                <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="rank-by"
                            value="points"
                            onChange={handleRankByChange}
                            checked={"points" == filter.RankBy}
                        />
                        <label htmlFor="points" className="pl-2">{t("points")}</label>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="rank-by"
                            value="rider_count"
                            onChange={handleRankByChange}
                            checked={"rider_count" == filter.RankBy}
                        />
                        <label htmlFor="rider_count" className="pl-2">{t("numberOfRiders")}</label>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="rank-by"
                            value="points_per_rider"
                            onChange={handleRankByChange}
                            checked={"points_per_rider" == filter.RankBy}
                        />
                        <label htmlFor="points_per_rider" className="pl-2">{t("pointsPerRider")}</label>
                    </div>
                </div>
            </div>
           
            <div>
                <p className="font-medium mb-2">{t("filterBy")}</p>
                <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="filter-by"
                            value="all"
                            onChange={handleFilterByChange}
                            checked={"all" == filter.FilterBy}
                        />
                        <label htmlFor="all" className="pl-2">{t("all")}</label>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="filter-by"
                            value="active"
                            onChange={handleFilterByChange}
                            checked={"active" == filter.FilterBy}
                        />
                        <label htmlFor="active" className="pl-2">{t("active")}</label>
                    </div>
                    <div className="flex items-center mr-8 mb-2">
                        <Radio
                            groupName="filter-by"
                            value="inactive"
                            onChange={handleFilterByChange}
                            checked={"inactive" == filter.FilterBy}
                        />
                        <label htmlFor="inactive" className="pl-2">{t("inactive")}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}