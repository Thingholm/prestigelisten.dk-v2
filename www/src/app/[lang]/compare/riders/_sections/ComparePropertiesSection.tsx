import { NationNameCell, Table, TableBody, TableCell, TableRow, TeamNameCell, YearCell } from "@/components/table";
import { Rider, Riders } from "@/db/rider";
import CompareProperties from "../../_components/CompareProperties";
import { Ranked } from "@/lib/helpers/rank";
import { groupResultsByKey } from "@/lib/helpers/groupResults";
import { getResultCategory } from "@/lib/helpers/resultCategory";
import { PointSystem } from "@/db/pointSystem";
import Section from "@/components/layout/Section";
import { getTranslations } from "next-intl/server";
import { dayInLeadersJerseyResultTypeIds } from "@/lib/constants/resultTypes";

export default async function ComparePropertiesSection({
    rider1,
    rider2,
    rankedActiveRiders,
    pointSystem
}: Readonly<{
    rider1: Rider | null,
    rider2: Rider | null,
    rankedActiveRiders: Ranked<Riders[number]>[],
    pointSystem: PointSystem
}>) {
    const t = await getTranslations("comparePage.rider");
    const tCategoryNames = await getTranslations("chartTooltips.categories"); 

    const currentYear = new Date().getFullYear();

    const rider1Categories = rider1 && Object.fromEntries(
        groupResultsByKey(
            rider1.results.map(result => ({
                ...result,
                category: getResultCategory(result)
            })), 
            pointSystem, 
            result => result.category
        ).map(group => [group.key, group.points])
    );

    const rider2Categories = rider2 && Object.fromEntries(
        groupResultsByKey(
            rider2.results.map(result => ({
                ...result,
                category: getResultCategory(result)
            })), 
            pointSystem, 
            result => result.category
        ).map(group => [group.key, group.points])
    );

    const rider1GreatestSeason = rider1?.rider_seasons.sort((a, b) => (b.points_for_year ?? 0) - (a.points_for_year ?? 0))[0];
    const rider2GreatestSeason = rider2?.rider_seasons.sort((a, b) => (b.points_for_year ?? 0) - (a.points_for_year ?? 0))[0];

    return (
        <Section className="flex-col">
            <div>
                <p className="font-semibold mb-2 text-center">{t("riderInformation")}</p>
                <Table>
                    <TableBody>
                        <TableRow>
                            <NationNameCell nation={rider1?.nations} className="w-1/3 sm:w-1/4 md:text-end"/>
                            <TableCell className="w-1/3 sm:w-1/2 text-center">{t("nationality")}</TableCell>
                            <NationNameCell nation={rider2?.nations} className="w-1/3 sm:w-1/4 text-end md:text-start"/>                  
                        </TableRow>
                        <TableRow>
                            <TeamNameCell team={rider1?.teams} className="w-1/3 sm:w-1/4 md:text-end"/>
                            <TableCell className="w-1/3 sm:w-1/2  text-center">{t("team")}</TableCell>
                            <TeamNameCell team={rider2?.teams} className="w-1/3 sm:w-1/4 text-end md:text-start"/>                  
                        </TableRow>
                        <TableRow>
                            <YearCell year={rider1?.year} className="w-1/3 sm:w-1/4 md:text-end"/>
                            <TableCell className="w-1/3 sm:w-1/2  text-center">{t("year")}</TableCell>
                            <YearCell year={rider2?.year} className="w-1/3 sm:w-1/4 text-end md:text-start"/>                  
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <p className="font-semibold mb-2 text-center">{t("pointsAndResults")}</p>
                <Table>
                    <TableBody>
                        <CompareProperties
                            value1={rider1?.rider_points[0].points}
                            value2={rider2?.rider_points[0].points}
                            title={t("points")}
                        />
                        <CompareProperties
                            value1={rider1?.rider_seasons.find(season => season.year == currentYear)?.rank_all_time}
                            value2={rider2?.rider_seasons.find(season => season.year == currentYear)?.rank_all_time}
                            title={t("placementAlltime")}
                            reverseComparison
                        />
                        <CompareProperties
                            value1={rankedActiveRiders.find(rider => rider.id == rider1?.id)?.rank}
                            value2={rankedActiveRiders.find(rider => rider.id == rider2?.id)?.rank}
                            title={t("placementActive")}
                            reverseComparison
                        />
                        <CompareProperties
                            value1={rider1?.results.filter(result => !dayInLeadersJerseyResultTypeIds.includes(result.result_type_id)).length}
                            value2={rider2?.results.filter(result => !dayInLeadersJerseyResultTypeIds.includes(result.result_type_id)).length}
                            title={t("numberOfResults")}
                        />
                        <CompareProperties
                            value1={rider1GreatestSeason?.year}
                            value2={rider2GreatestSeason?.year}
                            title={t("greatestSeasonYear")}
                            showCompareColor={false}
                            noFormat
                        />
                        <CompareProperties
                            value1={rider1GreatestSeason?.points_for_year}
                            value2={rider2GreatestSeason?.points_for_year}
                            title={t("greatestSeasonPoints")}
                        />
                    </TableBody>
                </Table>
            </div>

            <div>
                <p className="font-semibold mb-2 text-center">{t("categoryPoints")}</p>
                <Table>
                    <TableBody>
                        <CompareProperties
                            value1={rider1Categories?.gc}
                            value2={rider2Categories?.gc}
                            title={tCategoryNames("gc")}
                        />
                        <CompareProperties
                            value1={rider1Categories?.stageWin}
                            value2={rider2Categories?.stageWin}
                            title={tCategoryNames("stageWin")}
                        />
                        <CompareProperties
                            value1={rider1Categories?.oneDayRace}
                            value2={rider2Categories?.oneDayRace}
                            title={tCategoryNames("oneDayRace")}
                        />
                        <CompareProperties
                            value1={rider1Categories?.championship}
                            value2={rider2Categories?.championship}
                            title={tCategoryNames("championship")}
                        />
                        <CompareProperties
                            value1={rider1Categories?.gtJerseys}
                            value2={rider2Categories?.gtJerseys}
                            title={tCategoryNames("gtJerseys")}
                        />
                    </TableBody>
                </Table>
            </div>
        </Section>
    )
}