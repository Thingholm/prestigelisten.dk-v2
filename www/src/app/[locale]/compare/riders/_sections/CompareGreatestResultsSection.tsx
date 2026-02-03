import Section from "@/components/layout/Section";
import ResultNameListItem from "@/components/ResultNameListItem";
import { PointSystem } from "@/db/pointSystem";
import { Rider } from "@/db/rider";
import { sectionClasses } from "@/lib/constants/colors";
import { groupResults } from "@/lib/helpers/groupResults";
import { getGroupedResultName } from "@/lib/helpers/resultNames";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getRiderName } from "@/lib/helpers/riderName";
import { getRaceUrl } from "@/lib/helpers/urls";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export default async function CompareGreatestResultsSection({
    rider1,
    rider2,
    pointSystem
}: Readonly<{
    rider1: Rider | null,
    rider2: Rider | null,
    pointSystem: PointSystem
}>) {    
    const t = await getTranslations("comparePage.rider");
    const tResultNames = await getTranslations("getResultNames");

    const rider1GroupedResults = rider1 && sortGroupedResults(groupResults(rider1.results, pointSystem));
    const rider2GroupedResults = rider2 && sortGroupedResults(groupResults(rider2.results, pointSystem));

    return (
        <Section className="flex-col !gap-y-2">
            <div className={`${sectionClasses.gray} px-6 py-4 rounded-xl`}>
                <p className="font-semibold mb-2 md:text-center pl-8 md:pl-0">{t("greatestResults")}</p>
                <div className="flex flex-col md:flex-row justify-center gap-x-6 pl-8 md:pl-0">
                    <div className="md:w-1/2">
                        {rider1 &&
                            <>
                                <p className="mb-1 font-semibold md:hidden">{getRiderName(rider1)}</p>
                                <ul className="md:text-end flex flex-col gap-y-0.5">
                                    {rider1GroupedResults?.slice(0, 10).map(group => (
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
                                                <Link prefetch={false}  href={getRaceUrl(group.races.meta_races)} className="font-medium hover:underline">{getGroupedResultName(group, tResultNames)}</Link>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </>
                        }
                    </div>
                    <div className="md:w-1/2">
                        {rider2 &&
                            <>
                                <p className="mb-1 font-semibold mt-2 md:hidden">{getRiderName(rider2)}</p>
                                <ul className="flex flex-col gap-y-0.5">
                                    {rider2GroupedResults?.slice(0, 10).map(group => (
                                        <div key={group.id}>
                                            <ResultNameListItem 
                                                resultName={getGroupedResultName(group, tResultNames)}
                                                metaRace={group.races.meta_races}
                                                count={group.results.length}
                                                className="md:hidden"
                                            />
                                            <li className="hidden md:block">
                                                <Link prefetch={false}  href={getRaceUrl(group.races.meta_races)} className="font-medium hover:underline">{getGroupedResultName(group, tResultNames)}</Link>
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