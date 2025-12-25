"use client";

import Section from "@/components/layout/Section";
import ListTable from "../_tables/ListTable";
import { rankBy } from "@/lib/helpers/rank";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import BirthYearsFilterSubsection from "./BirthYearsFilterSubsection";
import { Tables } from "@/utils/supabase/database.types";
import NationsFilterSubsection from "./NationsFilterSubsection";
import StatusFilterSubsection from "./StatusFilterSubsection";
import { useRouter, useSearchParams } from "next/navigation";
import { filterToSearchParamsMapper, searchParamsToFilterMapper } from "@/lib/mappers/filterSearchParamsMapper";
import { IoReload } from "react-icons/io5";
import RidersSearchBar from "../_components/RiderSearchBar";
import { RidersWithNationAndTeam } from "@/db/rider";

export type RidersFilter = {
    status: "all" | "active" | "inactive";
    isSingleYear: boolean;
    bornBeforeOrIn: number;
    bornAfterOrIn: number;
    nations: (number | undefined)[];
}

const defaultRowAmount = 100;

export default function ListSection({
    riders,
    minBirthYear,
    maxBirthYear,
    nations
}: Readonly<{
    riders: RidersWithNationAndTeam,
    minBirthYear: number,
    maxBirthYear: number,
    nations: Tables<"nations">[]
}>) {
    const t = useTranslations("tableColumns");
    const tList = useTranslations("lists.riders")

    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultFilter: RidersFilter = {
        status: "all",
        isSingleYear: false,
        bornBeforeOrIn: maxBirthYear,
        bornAfterOrIn: minBirthYear,
        nations: [undefined]
    }

    const [filter, setFilter] = useState(searchParamsToFilterMapper(searchParams, defaultFilter))
    const [rowAmount, setRowAmount] = useState(defaultRowAmount)
    const [highlightedRiderId, setHighlightedRiderId] = useState<number | null>(null);
    const isFiltered = JSON.stringify(filter) != JSON.stringify(defaultFilter);

    const filterRiders = (riders: RidersWithNationAndTeam) => {
        return riders.filter(rider => {
            if (filter.status == "active" && !rider.active) return false;
            if (filter.status == "inactive" && rider.active) return false;

            if (filter.isSingleYear && rider.year !== filter.bornBeforeOrIn) return false;

            if (filter.bornAfterOrIn != defaultFilter.bornAfterOrIn || filter.bornBeforeOrIn != defaultFilter.bornBeforeOrIn ) {
                if (!rider.year) {
                    return false;
                }

                if (!filter.isSingleYear && (rider.year < filter.bornAfterOrIn || rider.year > filter.bornBeforeOrIn)) return false;
            }

            if (filter.nations.some(nation => nation) && !filter.nations.includes(rider.nation_id)) return false;

            return true;
        })
    }

    const alltimeRankingsLookupList = rankBy(riders.map(rider => ({ id: rider.id, points: rider.points })), "points");
    const rankedAndFilteredRiders = rankBy(filterRiders(riders), "points")

    useEffect(() => {
        setRowAmount(defaultRowAmount)
        setHighlightedRiderId(null);

        const params = filterToSearchParamsMapper(filter, defaultFilter).toString();

        const currentSearch = window.location.search.slice(1);

        if (params != currentSearch) {
            const newUrl = params 
                ? `${window.location.pathname}?${params}`
                : window.location.pathname
            
            window.history.replaceState({}, '', newUrl)
        }
    }, [filter, router])

    useEffect(() => {
        setFilter(searchParamsToFilterMapper(searchParams, defaultFilter));
    }, [searchParams])

    const handleReset = () => {
        setFilter(defaultFilter);
    }

    return (
        <Section className="flex-col">
            <div className="flex gap-x-96 sm:gap-x-12 md:gap-x-24 gap-y-8 flex-wrap lg:justify-between">
                <BirthYearsFilterSubsection 
                    filter={filter} 
                    setFilter={setFilter}
                    minBirthYear={minBirthYear}
                    maxBirthYear={maxBirthYear}
                />
                <NationsFilterSubsection
                    filter={filter}
                    setFilter={setFilter}
                    nations={nations}
                />
                <StatusFilterSubsection filter={filter} setFilter={setFilter}/>
                <div>
                    <Button 
                        className="flex items-center gap-2"
                        onClick={handleReset}
                        color="secondary"
                    >
                        <IoReload />
                        <span>{tList("resetFilter")}</span>
                    </Button>
                </div>
            </div>
            <RidersSearchBar
                riders={rankedAndFilteredRiders}
                setHighlightedRiderId={setHighlightedRiderId}
                setRange={setRowAmount}
            />
            <div className="w-full">
                <ListTable 
                    riders={rankedAndFilteredRiders} 
                    alltimeRankingsLookupList={alltimeRankingsLookupList}
                    rowAmount={rowAmount} 
                    highlightedRiderId={highlightedRiderId}
                    isFiltered={isFiltered}
                />
                {rowAmount < rankedAndFilteredRiders.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 100)}>{t("showMore")}</Button>}
            </div>
        </Section>
    )
}