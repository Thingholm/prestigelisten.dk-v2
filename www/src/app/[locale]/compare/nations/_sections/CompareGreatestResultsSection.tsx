import Section from "@/components/layout/Section";
import ResultNameListItem from "@/components/ResultNameListItem";
import { Nation } from "@/db/nations";
import { PointSystem } from "@/db/pointSystem";
import { sectionClasses } from "@/lib/constants/colors";
import { groupResults } from "@/lib/helpers/groupResults";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getRaceUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NationWithRaceResults } from "./ComparePropertiesSection";
import { nationalsRaceClassIds } from "@/lib/constants/raceClasses";
import { Race } from "@/db/race";

type ResultWithRace = (Nation["riders"][number]["results"][number] & {
    races: Race;
});

export default async function CompareGreatestResultsSection({
    nation1,
    nation2,
    pointSystem
}: Readonly<{
    nation1: NationWithRaceResults | null,
    nation2: NationWithRaceResults | null,
    pointSystem: PointSystem
}>) {    
    const t = await getTranslations("comparePage.nation");
    const tResultNames = await getTranslations("getResultNames");
    const tNations = await getTranslations("nations")

    const nation1Results = nation1?.riders
        .flatMap(rider => rider.results)
        .filter(result => result.races && !nationalsRaceClassIds.includes(result.races?.race_class_id ?? 0)) as ResultWithRace[];
    const nation2Results = nation2?.riders
        .flatMap(rider => rider.results)
        .filter(result => result.races && !nationalsRaceClassIds.includes(result.races?.race_class_id ?? 0)) as ResultWithRace[];
    
    const nation1GroupedResults = nation1Results && sortGroupedResults(groupResults(nation1Results, pointSystem));
    const nation2GroupedResults = nation2Results && sortGroupedResults(groupResults(nation2Results, pointSystem));
    
    return (
        <Section className="flex-col !gap-y-2">
            <div className={`${sectionClasses.gray} px-6 py-4 rounded-xl`}>
                <p className="font-semibold mb-2 md:text-center pl-8 md:pl-0">{t("greatestResults")}</p>
                <div className="flex flex-col md:flex-row justify-center gap-x-6 pl-8 md:pl-0">
                    <div className="md:w-1/2">
                        {nation1 &&
                            <>
                                <p className="mb-1 font-semibold md:hidden">{tNations(`${nation1.code}.name`)}</p>
                                <ul className="md:text-end flex flex-col gap-y-0.5">
                                    {nation1GroupedResults?.slice(0, 10).map(group => (
                                        <div key={group.id}>
                                            <ResultNameListItem 
                                                key={group.id}
                                                resultName={getGroupedResultName(group, tResultNames)}
                                                metaRace={group.races.meta_races}
                                                count={group.results.length}
                                                className="md:hidden"
                                            />
                                            <li className="hidden md:block">
                                                {group.results.length > 1 && 
                                                    <span className="mr-2 opacity-70">{group.results.length}x</span>
                                                }
                                                <Link href={getRaceUrl(group.races.meta_races)} className="font-medium hover:underline">{getGroupedResultName(group, tResultNames)}</Link>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </>
                        }
                    </div>
                    <div className="md:w-1/2">
                        {nation2 &&
                            <>
                                <p className="mb-1 font-semibold mt-2 md:hidden">{tNations(`${nation2.code}.name`)}</p>
                                <ul className="flex flex-col gap-y-0.5">
                                    {nation2GroupedResults?.slice(0, 10).map(group => (
                                        <div key={group.id}>
                                            <ResultNameListItem 
                                                resultName={getGroupedResultName(group, tResultNames)}
                                                metaRace={group.races.meta_races}
                                                count={group.results.length}
                                                className="md:hidden"
                                            />
                                            <li className="hidden md:block">
                                                <Link href={getRaceUrl(group.races.meta_races)} className="font-medium hover:underline">{getGroupedResultName(group, tResultNames)}</Link>
                                                {group.results.length > 1 && 
                                                    <span className="ml-2 opacity-70">{group.results.length}x</span>
                                                }
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Section>
    )
}