"use client";

import NavigatorSection from "@/components/NavigatorSection";
import ResultNameListItem from "@/components/ResultNameListItem";
import { RiderNameCell, Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import { NationWithRiders } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { Race } from "@/db/race";
import { NationCount } from "@/db/seasons";
import { nationalsRaceClassIds } from "@/lib/constants/raceClasses";
import { groupResults, groupResultsByKey } from "@/lib/helpers/groupResults";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { rankBy } from "@/lib/helpers/rank";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ResultsEachYearSection({
    nation,
    pointSystem,
    results,
    nationCountEachSeason
}: Readonly<{
    nation: NationWithRiders,
    pointSystem: PointSystem,
    results: (Tables<'results'> & { races: Race })[],
    nationCountEachSeason: NationCount[]
}>) {
    const t = useTranslations("nationPage.resultsEachYear");
    const tResultNames = useTranslations("getResultNames");
    const tTableColumns = useTranslations("tableColumns");

    const minYear = Math.min(...nation.nation_seasons.map(season => season.year));
    const maxYear = Math.max(...nation.nation_seasons.map(season => season.year));
    const years = Array.from({ length: maxYear - minYear + 1 },(_, i) => maxYear - i);

    const [selectedYear, setSelectedYear] = useState<number>(maxYear);

    const groupedResultsForYear = groupResults(results.filter(result => result.year == selectedYear), pointSystem, true);
    const season = nation.nation_seasons.find(season => season.year == selectedYear);
    const riderSeasonsForYear = rankBy(
            groupResultsByKey(
                results.filter(result => result.year == selectedYear).map(result => ({ 
                    ...result, 
                    riders: {
                        ...nation.riders.find(rider => rider.id == result.rider_id),
                        nations: { name: nation.name, code: nation.code }
                    } 
                })),
                pointSystem,
                result => result.rider_id
            ),
            "points"
        );

    const getYearlyMovement = () => {
        if (!season) {
            return "-";
        }

        const previousSeason = nation.nation_seasons.find(season => season.year == selectedYear - 1);
        if (!previousSeason || !previousSeason.rank_all_time) {
            const nationCountForSeason = nationCountEachSeason.find(nationCount => nationCount.year == selectedYear)?.row_count ?? season.rank_all_time;
            return `+${nationCountForSeason - season.rank_all_time}`;
        }

        const movement = previousSeason.rank_all_time - season.rank_all_time
        return movement > 0 ? `+${movement}` : movement;
    }

    return (
        <NavigatorSection
            options={years}
            selectedOption={selectedYear}
            setSelectedOption={setSelectedYear}
            title={t("title")}
        >
            <div className="flex gap-x-20 gap-y-6 pl-4 sm:pl-0 flex-col lg:flex-row mb-4">
                <div>
                    <p className="font-semibold text-lg mb-2">{t("results")}</p>
                    <ul>
                        {sortGroupedResults(groupedResultsForYear)
                            .filter(group => !nationalsRaceClassIds.includes(group.races.race_class_id))
                            .map(group => (
                                <ResultNameListItem
                                    key={group.id}
                                    resultName={getGroupedResultName(group, tResultNames, true)}
                                    metaRace={group.races.meta_races}
                                    count={group.results.length}
                                    points={group.points}
                                />
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">{t("highlights")}</h4>
                    <ul>
                        <li>{t("pointsInYear", { year: selectedYear })}: <span className="font-medium">{formatNumber(season?.points_for_year ?? 0)}</span></li>
                        <li>{t("pointsAllTime")}: <span className="font-medium">{formatNumber(season?.points_all_time ?? 0)}</span></li>
                        <li>{t("placementForYear", { year: selectedYear })}: <span className="font-medium">{formatNumber(season?.rank_for_year) ?? "-"}</span></li>
                        <li>{t("placementOnPrestigeList")}: <span className="font-medium">{formatNumber(season?.rank_all_time) ?? "-"}</span></li>
                        <li>{t("movementOnPrestigeList")}: <span className="font-medium">{getYearlyMovement()}</span></li>
                        <li>{t("numberOfResults")}: <span className="font-medium">{formatNumber(groupedResultsForYear.flatMap(group => group.results)?.length) ?? 0}</span></li>
                    </ul>
                </div>
            </div>
            <div className="pl-4 sm:pl-0">
                <p className="font-semibold text-lg mb-2 text-pretty">{t("mostPoints", { year: selectedYear })}</p>
                <Table>
                    <TableHead>
                        <TableColumn>{tTableColumns("no")}</TableColumn>
                        <TableColumn>{tTableColumns("rider")}</TableColumn>
                        <TableColumn>{tTableColumns("points")}</TableColumn>
                    </TableHead>
                    <TableBody>
                        {riderSeasonsForYear.map(group => {
                            const rider = group.results[0].riders;

                            if (!rider) return <></>;

                            return (
                                <TableRow key={rider.id}>
                                    <TableCell>{group.rank}</TableCell>
                                    <RiderNameCell rider={rider as Tables<"riders">} showFlagBreakpoint="always"/>
                                    <TableCell>{group.points}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </NavigatorSection>
    );
}