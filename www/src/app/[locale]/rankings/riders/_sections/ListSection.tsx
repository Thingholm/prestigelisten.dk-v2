"use client";

import Section from "@/components/layout/Section";
import ListTable from "../_tables/ListTable";
import { rankBy } from "@/lib/helpers/rank";
import { useEffect, useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import BirthYearsFilterSubsection from "./BirthYearsFilterSubsection";
import { Tables } from "@/utils/supabase/database.types";
import NationsFilterSubsection from "./NationsFilterSubsection";
import StatusFilterSubsection from "./StatusFilterSubsection";
import { useRouter, useSearchParams } from "next/navigation";
import { filterToSearchParamsMapper, searchParamsToFilterMapper } from "@/lib/mappers/filterSearchParamsMapper";
import { IoChevronDown, IoReload } from "react-icons/io5";
import RidersSearchBar from "../_components/RiderSearchBar";
import { RidersWithNationAndTeam } from "@/db/rider";
import { getRiderPointsForRange } from "@/app/actions/rider-seasons-points";
import PointsYearRangeFilterSubsection from "./PointsYearRangeFilterSubsection";

export type RidersFilter = {
    status: "all" | "active" | "inactive";
    isSingleYear: boolean;
    bornBeforeOrIn: number;
    bornAfterOrIn: number;
    nations: (number | undefined)[];
    yearRange: { start: number; end: number } | null;
}

const defaultRowAmount = 100;
const MIN_SEASON_YEAR = 1876;
const MAX_SEASON_YEAR = new Date().getFullYear();

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
        nations: [undefined],
        yearRange: null,
    }

    const [filter, setFilter] = useState(searchParamsToFilterMapper(searchParams, defaultFilter))
    const [rowAmount, setRowAmount] = useState(defaultRowAmount)
    const [highlightedRiderId, setHighlightedRiderId] = useState<number | null>(null);
    const isFiltered = JSON.stringify(filter) != JSON.stringify(defaultFilter);

    const [yearRangeRiders, setYearRangeRiders] = useState<RidersWithNationAndTeam | null>(null);
    const [isPending, startTransition] = useTransition();

    const [showFilter, setShowFilter] = useState(isFiltered);

    useEffect(() => {
        if (!filter.yearRange) {
            setYearRangeRiders(null);
            return;
        }

        const { start, end } = filter.yearRange;

        startTransition(async () => {
            const riderPointsRange = await getRiderPointsForRange(start, end);
            const ranked = rankBy(
                riderPointsRange.map((r) => ({
                    ...riders.find((ri) => ri.id === r.rider_id)!,
                    points: r.points_for_year,
                })),
                "points"
            );
            setYearRangeRiders(ranked);
        });
    }, [filter.yearRange?.start, filter.yearRange?.end]);

    const baseRiders = filter.yearRange ? (yearRangeRiders ?? []) : riders;

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
    const rankedAndFilteredRiders = rankBy(filterRiders(baseRiders), "points")

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
            <Button 
                onClick={() => setShowFilter(!showFilter)} 
                variant="text" 
                color="secondary" 
                className="flex justify-between items-center sm:hidden !px-0 hover:bg-transparent! !-mb-2 !mt-3"
            >
                <p>{showFilter ? tList("hideFilter") : tList("showFilter")}</p>
                <IoChevronDown className={`${showFilter ? 'rotate-180' : ''} duration-200`} />
            </Button>
            <div className={`${showFilter ? 'flex' : 'hidden sm:flex'} flex gap-x-96 sm:gap-x-12 md:gap-x-24 gap-y-8 flex-wrap lg:justify-between`}>
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
                <PointsYearRangeFilterSubsection
                    filter={filter}
                    setFilter={setFilter}
                    minSeasonYear={MIN_SEASON_YEAR}
                    maxSeasonYear={MAX_SEASON_YEAR}
                />
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
                    isPending={isPending}
                />
                {rowAmount < rankedAndFilteredRiders.length && <Button fill color="secondary" className="!py-1 mt-1" onClick={() => setRowAmount(s => s + 100)}>{t("showMore")}</Button>}
            </div>
        </Section>
    )
}