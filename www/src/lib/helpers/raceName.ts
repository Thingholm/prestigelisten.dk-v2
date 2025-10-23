import { useTranslations } from "next-intl";

type MetaRace = {
    id: number;
    name: string;
    nations?: {
        code: string;
    } | null;
}

export function getResultRaceName(race: MetaRace, t: ReturnType<typeof useTranslations>) {
    if (race.name.includes("mester i enkeltstart") && race.nations) {
        return `${t(`nations.${race.nations.code}.adjective`)} ${t("championITT")}`;
    }

    if (race.name.includes("mester") && race.nations) {
        return `${t(`nations.${race.nations.code}.adjective`)} ${t("champion")}`;
    }

    const raceIdsForTranlation = [225, 226, 227, 228, 229, 230, 231, 289];

    if (raceIdsForTranlation.includes(race.id)) {
        return t((`metaRaces.${race.id}`))
    }

    return race.name
}

export function getRaceName(race: MetaRace, t: ReturnType<typeof useTranslations>) {
    if (race.name.includes("mester i enkeltstart") && race.nations) {
        return `${t(`nations.${race.nations.code}.adjective`)}${t("championshipITT")}`;
    }

    if (race.name.includes("mester") && race.nations) {
        return `${t(`nations.${race.nations.code}.adjective`)}${t("championship")}`;
    }
    
    const raceIdsForTranlation = [225, 226, 227, 228, 229, 230, 231, 289];

    if (raceIdsForTranlation.includes(race.id)) {
        return t((`metaRaces.${race.id}`))
    }

    return race.name
}