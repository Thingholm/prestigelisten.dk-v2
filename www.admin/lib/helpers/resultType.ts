export function getResultTypeSortValue(resultTypeId: number) {
    if (resultTypeId < 12) {
        return resultTypeId + 100;
    }

    return resultTypeId;
}

export function getGeneralResultType(resultTypeId: number) {
    if (8 <= resultTypeId && resultTypeId <= 11) {
        return 99;
    }

    return resultTypeId;
}