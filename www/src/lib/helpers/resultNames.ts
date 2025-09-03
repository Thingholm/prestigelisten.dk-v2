import { useTranslations } from "next-intl";
import { raceClassesWithRenames } from "../constants/raceClasses";
import { getResultRaceName } from "./raceName";

type GroupedResult = {
    races: {
        meta_races: {
            id: number;
            name: string;
            nations: {
                code: string;
            }
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

    const isGold = groupedResult.result_type_id == 12;

    if (isGold) {
        resultName += t(`raceClasses.${groupedResult.races.race_class_id}`)
        return resultName;
    }
    
    const isStageWin = groupedResult.result_type_id == 7;
    const isChampionship = raceClassesWithRenames.includes(groupedResult.races.race_class_id);
    const isPlacement = [2, 3, 4].includes(groupedResult.result_type_id) && (showPlacement != undefined || showPlacement != false) && groupedResult?.placement != null
    const isNotWin = groupedResult.result_type_id != 1;
    const isDayInLeadersJersey = 8 <= groupedResult.result_type_id && groupedResult.result_type_id <= 11;

    if (isStageWin) {
        resultName += `${t(resultCount > 1 ? "stageInLower" : "stageIn")} `
    } else if (isPlacement) {
        resultName += `${groupedResult.placement}${t(`suffixes.${getSuffix(groupedResult.placement!)}`)} ${t("place")} ${t(isChampionship ? "at" : "in")} `
    } else if (isDayInLeadersJersey) {
        resultName += `${t("resultTypes.99")} ${t("in")} `
    } else if (isNotWin) {
        resultName += t(`resultTypes.${groupedResult.result_type_id}`)

        if (isChampionship) {
            resultName += ` ${t("at")} `
        } else {
            resultName += ` ${t("in")} `
        }
    }

    resultName += getResultRaceName(groupedResult.races.meta_races, t)
    return resultName;
}

export function getGroupedResultNameWithCount(groupedResult: GroupedResult, t: ReturnType<typeof useTranslations>, showPlacement?: boolean) {
    const resultCount = groupedResult.results.length;

    let resultName = resultCount > 1 ? `${resultCount}x ` : ``

    resultName += getGroupedResultName(groupedResult, t, showPlacement);

    return resultName;
}

type Result = {
    result_type_id: number;
    stage: number | null;
    placement: number | null;
}

export function getOnlyResultName(result: Result, t: ReturnType<typeof useTranslations>) {
    if ([2, 3, 4].includes(result.result_type_id) && result.placement) {
        return `${result.placement}${t(`suffixes.${getSuffix(result.placement)}`)}`
    }

    if (result.result_type_id == 7 && result.stage) {
        return `${result.stage}${t(`suffixes.${getSuffix(result.stage)}`)} ${t("stage")}`
    }

    return t(`resultTypes.${result.result_type_id}`)
}


function getSuffix(number: number) {
    if (10 < number && number < 14) return "other";
    const numberString = number.toString();

    const lastChar = numberString.slice(numberString.length - 1, numberString.length);

    if (["1", "2", "3"].includes(lastChar)) return lastChar;

    return  "other";
}