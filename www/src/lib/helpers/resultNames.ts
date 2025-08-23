import { useTranslations } from "next-intl";
import { raceClassesWithRenames } from "../constants/raceClasses";

type GroupedResult = {
    races: {
        meta_races: {
            name: string;
        },
        race_class_id: number;
    };
    result_type_id: number;
    results: unknown[];
    placement: number | null;
}

export function getGroupedResultName(groupedResult: GroupedResult, t: ReturnType<typeof useTranslations>, showPlacement?: boolean) {
    let resultName = "";

    const resultCount = groupedResult.results.length;
    if (resultCount > 1) resultName += `${resultCount}x `

    const isGold = groupedResult.result_type_id == 12;

    if (isGold) {
        resultName += t(`raceClasses.${groupedResult.races.race_class_id}`)
        return resultName;
    }
    
    const isStageWin = groupedResult.result_type_id == 7;
    const isChampionship = raceClassesWithRenames.includes(groupedResult.races.race_class_id);
    const isPlacement = [2, 3, 4].includes(groupedResult.result_type_id) && (showPlacement != undefined || showPlacement != false) && groupedResult?.placement != null
    const isNotWin = groupedResult.result_type_id != 1;

    if (isStageWin) {
        resultName += `${t(resultCount > 1 ? "stageInLower" : "stageIn")} `
    } else if (isPlacement) {
        resultName += `${groupedResult.placement}${t(`suffixes.${getSuffix(groupedResult.placement!)}`)} ${t("place")} ${t(isChampionship ? "at" : "in")} `
    } else if (isNotWin) {
        resultName += t(`resultTypes.${groupedResult.result_type_id}`)

        if (isChampionship) {
            resultName += ` ${t("at")} `
        } else {
            resultName += ` ${t("in")} `
        }
    }

    resultName += groupedResult.races.meta_races.name
    return resultName;
}

function getSuffix(number: number) {
    if (10 < number && number < 14) return "other";
    const numberString = number.toString();

    const lastChar = numberString.slice(numberString.length - 1, numberString.length);

    if (["1", "2", "3"].includes(lastChar)) return lastChar;

    return  "other";

}