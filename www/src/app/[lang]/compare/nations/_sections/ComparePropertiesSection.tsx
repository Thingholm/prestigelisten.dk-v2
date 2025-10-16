import Section from "@/components/layout/Section";
import { NationPointsWithRiderCount } from "@/db/nationPoints";
import { Nation } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { getTranslations } from "next-intl/server";
import CompareProperties from "../../_components/CompareProperties";
import { Table, TableBody } from "@/components/table";
import { rankBy, Ranked } from "@/lib/helpers/rank";
import { formatNumber } from "@/lib/helpers/localeHelpers";
import { Race } from "@/db/race";
import { nationalsRaceClassIds } from "@/lib/constants/raceClasses";
import { groupResultsByKey } from "@/lib/helpers/groupResults";
import { getResultCategory } from "@/lib/helpers/resultCategory";

export type NationWithRaceResults = Omit<Nation, "riders"> & {
  riders: {
    results: (Nation["riders"][number]["results"][number] & {
      races?: Race;
    })[];
  }[];
};

export default async function ComparePropertiesSection({
    nation1,
    nation2,
    nations,
    pointSystem
}: Readonly<{
    nation1: NationWithRaceResults | null,
    nation2: NationWithRaceResults | null,
    nations: Ranked<NationPointsWithRiderCount[number]>[],
    pointSystem: PointSystem
}>) {
    const t = await getTranslations("comparePage.nation");
    const tCategoryNames = await getTranslations("chartTooltips.categories"); 

    const nation1Points = nations.find(nation => nation.id == nation1?.id);
    const nation2Points = nations.find(nation => nation.id == nation2?.id);

    const activeRanks = rankBy(nations, "active_points");
    const nation1ActivePoints = activeRanks.find(nation => nation.id == nation1?.id);
    const nation2ActivePoints = activeRanks.find(nation => nation.id == nation2?.id);

    const nation1Results = nation1?.riders.flatMap(rider => rider.results).filter(result => !nationalsRaceClassIds.includes(result.races?.race_class_id ?? 0));
    const nation2Results = nation2?.riders.flatMap(rider => rider.results).filter(result => !nationalsRaceClassIds.includes(result.races?.race_class_id ?? 0));

    const nation1ResultYears = nation1Results?.map(result => result.year);
    const nation2ResultYears = nation2Results?.map(result => result.year);

    const nation1Categories = nation1Results && Object.fromEntries(
        groupResultsByKey(
            nation1Results.map(result => ({
                ...result,
                category: getResultCategory({
                    result_type_id: result.result_type_id,
                    races: { race_class_id: result.races?.race_class_id ?? 0 },
                }),                
                races: {
                    race_class_id: result.races?.race_class_id ?? 0,
                    meta_race_id: result.races?.meta_race_id ?? 0,
                },
            })), 
            pointSystem, 
            result => result.category
        ).map(group => [group.key, group.points])
    );

    const nation2Categories = nation2Results && Object.fromEntries(
        groupResultsByKey(
            nation2Results.map(result => ({
                ...result,
                category: getResultCategory({
                    result_type_id: result.result_type_id,
                    races: { race_class_id: result.races?.race_class_id ?? 0 },
                }),                
                races: {
                    race_class_id: result.races?.race_class_id ?? 0,
                    meta_race_id: result.races?.meta_race_id ?? 0,
                },
            })), 
            pointSystem, 
            result => result.category
        ).map(group => [group.key, group.points])
    );

    return (
        <Section className="flex-col">
            <div>
                <p className="font-semibold mb-2 text-center">{t("pointInformation")}</p>
                <Table>
                    <TableBody>
                        <CompareProperties
                            value1={nation1Points?.points}
                            value2={nation2Points?.points}
                            title={t("points")}
                        />
                        <CompareProperties
                            value1={nation1Points?.rank}
                            value2={nation2Points?.rank}
                            title={t("placement")}
                            reverseComparison
                        />
                        <CompareProperties
                            value1={nation1ActivePoints?.active_points}
                            value2={nation2ActivePoints?.active_points}
                            title={t("pointsActive")}
                        />
                        <CompareProperties
                            value1={nation1ActivePoints?.rank}
                            value2={nation2ActivePoints?.rank}
                            title={t("placementActive")}
                            reverseComparison
                        />
                        <CompareProperties
                            value1={nation1Points?.rider_count}
                            value2={nation2Points?.rider_count}
                            title={t("numberOfRidersWithPoints")}
                        />                        
                        <CompareProperties
                            value1={(nation1Points?.points && nation1Points?.rider_count) 
                                ? (formatNumber(nation1Points?.points / nation1Points?.rider_count, 1) as number | null | undefined) 
                                : null
                            }
                            value2={(nation2Points?.points && nation2Points?.rider_count) 
                                ? (formatNumber(nation2Points?.points / nation2Points?.rider_count, 1) as number | null | undefined) 
                                : null
                            }
                            title={t("pointsPerRider")}
                        />
                    </TableBody>
                </Table>
            </div>

             <div>
                <p className="font-semibold mb-2 text-center">{t("results")}</p>
                <Table>
                    <TableBody>
                        <CompareProperties
                            value1={nation1Results?.length}
                            value2={nation2Results?.length}
                            title={t("numberOfResults")}
                        />
                        <CompareProperties
                            value1={nation1ResultYears && Math.min(...nation1ResultYears)}
                            value2={nation2ResultYears && Math.min(...nation2ResultYears)}
                            title={t("firstPointGivingResult")}
                            reverseComparison
                            noFormat
                        />
                        <CompareProperties
                            value1={nation1ResultYears && Math.max(...nation1ResultYears)}
                            value2={nation2ResultYears && Math.max(...nation2ResultYears)}
                            title={t("latestPointGivingResult")}
                            noFormat
                        />
                    </TableBody>
                </Table>
            </div>
            <div>

                <p className="font-semibold mb-2 text-center">{t("categoryPoints")}</p>
                <Table>
                    <TableBody>
                        <CompareProperties
                            value1={nation1Categories?.gc}
                            value2={nation2Categories?.gc}
                            title={tCategoryNames("gc")}
                        />
                        <CompareProperties
                            value1={nation1Categories?.stageWin}
                            value2={nation2Categories?.stageWin}
                            title={tCategoryNames("stageWin")}
                        />
                        <CompareProperties
                            value1={nation1Categories?.oneDayRace}
                            value2={nation2Categories?.oneDayRace}
                            title={tCategoryNames("oneDayRace")}
                        />
                        <CompareProperties
                            value1={nation1Categories?.championship}
                            value2={nation2Categories?.championship}
                            title={tCategoryNames("championship")}
                        />
                        <CompareProperties
                            value1={nation1Categories?.other}
                            value2={nation2Categories?.other}
                            title={tCategoryNames("other")}
                        />
                    </TableBody>
                </Table>
            </div>
        </Section>
    )
}