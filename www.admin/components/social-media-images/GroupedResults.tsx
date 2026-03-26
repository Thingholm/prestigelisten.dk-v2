import { Settings } from "./ContentWrapper";
import { groupResults } from "@/lib/helpers/groupResults";
import { sortGroupedResults } from "@/lib/helpers/results";
import { getGroupedResultNameWithCount } from "@/lib/helpers/resultNames";
import { useT } from "@/lib/helpers/translations";
import { Tables } from "@/lib/supabase/database.types";
import { Rider } from "@/lib/db/riders";

export default function GroupedResults({
    rider,
    settings,
    pointSystem,
    locale
}: Readonly<{
    rider: Rider,
    settings: Settings,
    pointSystem: Tables<"point_system">[],
    locale: "en" | "da"
}>) {
    const t = useT("twitterCard", locale);
    const tResultNames = useT("getResultNames", locale);

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