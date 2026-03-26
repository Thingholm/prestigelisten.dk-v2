type Result = {
    result_type: number;
    races: {
        race_class_id: number;
    }
}

export type ResultCategory = "gc" | "stageWin" | "oneDayRace" | "championship" | "gtJerseys";

export function getResultCategory(result: Result): ResultCategory {
    const gcRaceClassIds = [1, 2, 4, 6, 8, 10, 26];
    const oneDayRaceRaceClassIds = [3, 5, 7, 9, 11, 24];
    const championshipRaceClassIds = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27];

    if (oneDayRaceRaceClassIds.includes(result.races.race_class_id)) {
        return "oneDayRace";
    }

    if (championshipRaceClassIds.includes(result.races.race_class_id)) {
        return "championship";
    }

    if (gcRaceClassIds.includes(result.races.race_class_id)) {
        if (result.result_type == 5 || result.result_type == 6) {
            return "gtJerseys";
        }

        if (result.result_type == 7) {
            return "stageWin";
        }

        return "gc";
    }

    return "oneDayRace";
}