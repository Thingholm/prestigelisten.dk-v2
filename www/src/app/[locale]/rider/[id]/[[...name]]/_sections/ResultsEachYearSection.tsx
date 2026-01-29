"use client";

import NavigatorSection from "@/components/NavigatorSection";
import ResultNameListItem from "@/components/ResultNameListItem";
import { PointSystem } from "@/db/pointSystem";
import { Rider } from "@/db/rider";
import { RiderCount } from "@/db/seasons";
import { dayInLeadersJerseyResultTypeIds } from "@/lib/constants/resultTypes";
import { groupResults } from "@/lib/helpers/groupResults";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ResultsEachYearSection({
    rider,
    pointSystem,
    riderCountEachSeason
}: Readonly<{
    rider: Rider,
    pointSystem: PointSystem,
    riderCountEachSeason: RiderCount[]
}>) {
    const t = useTranslations("riderPage.resultsEachYear");
    const tResultNames = useTranslations("getResultNames");
    
    const minYear = Math.min(...rider.results.map(result => result.year));
    const maxYear = Math.max(...rider.results.map(result => result.year));
    const years = Array.from({ length: maxYear - minYear + 1 },(_, i) => maxYear - i);

    const [selectedYear, setSelectedYear] = useState<number>(maxYear);
    
    const groupedResultsForYear = groupResults(rider.results.filter(result => result.year == selectedYear), pointSystem, true);
    const resultCountForYear = formatNumber(rider.results.filter(result => result.year == selectedYear && !dayInLeadersJerseyResultTypeIds.includes(result.result_type))?.length) ?? 0;
    const season = rider.rider_seasons.find(season => season.year == selectedYear);

    const getYearlyMovement = () => {
        if (!season) {
            return "-";
        }

        const previousSeason = rider.rider_seasons.find(season => season.year == selectedYear - 1);
        if (!previousSeason || !previousSeason.rank_all_time) {
            const riderCountForSeason = riderCountEachSeason.find(riderCount => riderCount.year == selectedYear)?.row_count ?? season.rank_all_time;
            return `+${riderCountForSeason - season.rank_all_time}`;
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
                        {sortGroupedResults(groupedResultsForYear).map(group => (
                            <ResultNameListItem
                                key={group.id}
                                resultName={getGroupedResultName(group, tResultNames, true)}
                                metaRace={group.races.meta_races}
                                count={group.results.length}
                                points={group.points}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">{t("highlights")}</h4>
                    <ul>
                        <li>{t("resultCount")}: <span className="font-medium">{resultCountForYear}</span></li>
                        <li>{t("pointsInYear", { year: selectedYear })}: <span className="font-medium">{formatNumber(season?.points_for_year ?? 0)}</span></li>
                        <li>{t("placementForYear")}: <span className="font-medium">{formatNumber(season?.rank_for_year) ?? "-"}</span></li>
                        <li>{t("pointsEntireCareer")}: <span className="font-medium">{formatNumber(season?.points_all_time ?? 0)}</span></li>
                        <li>{t("placementOnPrestigeList")}: <span className="font-medium">{formatNumber(season?.rank_all_time) ?? "-"}</span></li>
                        <li>{t("movementOnPrestigeList")}: <span className="font-medium">{getYearlyMovement()}</span></li>
                    </ul>
                </div>
            </div>
        </NavigatorSection>
    )
}