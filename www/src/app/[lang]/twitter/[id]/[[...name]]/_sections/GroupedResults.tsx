import { Rider } from "@/db/rider";
import { Settings } from "./ContentWrapper";
import { useTranslations } from "use-intl";
import { groupResults } from "@/lib/helpers/groupResults";
import { PointSystem } from "@/db/pointSystem";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getGroupedResultNameWithCount } from "@/lib/helpers/resultNames";

export default function GroupedResults({
    rider,
    settings,
    pointSystem
}: Readonly<{
    rider: Rider,
    settings: Settings,
    pointSystem: PointSystem
}>) {
    const t = useTranslations("twitterCard");
    const tResultNames = useTranslations("getResultNames");

    const groupedResults = sortGroupedResults(groupResults(rider.results, pointSystem));

    if (settings.sortResultsBy == "isolated") {
        groupedResults.sort((a, b) => b.results[0].points - a.results[0].points)
    }

    return (
        <div className="mt-2">
            <p className="font-semibold">{t("greatestResults")}</p>
            <div className="flex flex-col flex-wrap gap-x-8 max-h-16 text-sm">
                {groupedResults.slice(0, 6).map(group => (
                    <p key={group.id}>
                        {getGroupedResultNameWithCount(group, tResultNames)}
                    </p>
                ))}
            </div>
        </div>
    )
}