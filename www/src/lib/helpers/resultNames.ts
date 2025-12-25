import { useTranslations } from "next-intl";
import { raceClassesWithRenames } from "../constants/raceClasses";
import { getResultRaceName } from "./raceName";

type GroupedResult = {
    races: {
        meta_races: {
            id: number;
            name: string;
            nations?: {
                code: string;
            } | null;
        },
        race_class_id: number;
    };
    result_type: number;
    results?: unknown[] | undefined;
    placement: number | null;
    stage?: number | null;
}

export function getGroupedResultName(groupedResult: GroupedResult, t: ReturnType<typeof useTranslations>, showPlacement?: boolean, showStage?: boolean) {
    let resultName = "";

    const resultCount = groupedResult.results?.length ?? 0;

    const isGold = groupedResult.result_type == 12;

    if (isGold) {
        resultName += t(`raceClasses.${groupedResult.races.race_class_id}`)
        return resultName;
    }
    
    const isStageWin = groupedResult.result_type == 7 && showStage;
    const isChampionship = raceClassesWithRenames.includes(groupedResult.races.race_class_id);
    const isPlacement = [2, 3, 4, 102, 103, 104, 105, 106, 107, 108, 109, 110].includes(groupedResult.result_type) && (showPlacement != undefined && showPlacement != false) && groupedResult?.placement != null
    const isNotWin = groupedResult.result_type != 1;
    const isDayInLeadersJersey = 8 <= groupedResult.result_type && groupedResult.result_type <= 11;

    if (isStageWin) {
        resultName += showPlacement ? `${groupedResult.stage}${t(`suffixes.${getSuffix(groupedResult.stage!)}`)} ${t("stageInLower")} ` : `${t(resultCount > 1 ? "stageInLower" : "stageIn")} `
    } else if (isPlacement) {
        resultName += `${groupedResult.placement}${t(`suffixes.${getSuffix(groupedResult.placement!)}`)} ${t("place")} ${t(isChampionship ? "at" : "in")} `
    } else if (isDayInLeadersJersey) {
        resultName += `${t("resultTypes.99")} ${t("in")} `
    } else if (isNotWin) {
        resultName += t(`resultTypes.${groupedResult.result_type}`)

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
    const resultCount = groupedResult.results?.length ?? 0;

    let resultName = resultCount > 1 ? `${resultCount}x ` : ``

    resultName += getGroupedResultName(groupedResult, t, showPlacement);

    return resultName;
}

type Result = {
    result_type: number;
    stage: number | null;
    placement: number | null;
}

export function getOnlyResultName(result: Result, t: ReturnType<typeof useTranslations>, stageNumberIsPrefix: boolean = true) {
    if ([2, 3, 4].includes(result.result_type) && result.placement) {
        return `${result.placement}${t(`suffixes.${getSuffix(result.placement)}`)} ${t("place")}`
    }

    if (result.result_type == 7 && result.stage) {
        if (stageNumberIsPrefix) {
            return `${result.stage}${t(`suffixes.${getSuffix(result.stage)}`)} ${t("stage")}`
        } else {
            return `${t("stageCapitalized")} ${result.stage}`
        }
    }

    return t(`resultTypes.${result.result_type}`)
}


export function getSuffix(number: number) {
    if (10 < number && number < 14) return "other";
    const numberString = number.toString();

    const lastChar = numberString.slice(numberString.length - 1, numberString.length);

    if (["1", "2", "3"].includes(lastChar)) return lastChar;

    return  "other";
}