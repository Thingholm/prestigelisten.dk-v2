type MetaRace = {
    id: number,
    nations?: {
        code: string;
    } | null
}

export function getRaceFlagCode(metaRace: MetaRace) {
    if (metaRace.nations?.code) return metaRace.nations.code;

    const olympicIds = [225, 226, 231];
    const wcIds = [227, 228, 289];
    const ecIds = [229, 230];

    if (olympicIds.includes(metaRace.id)) return "ol";
    if (wcIds.includes(metaRace.id)) return "wc";
    if (ecIds.includes(metaRace.id)) return "eu";

    return "xx";
}