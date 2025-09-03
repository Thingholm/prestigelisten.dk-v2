export function getResultTypeSortValue(resultTypeId: number) {
    if (resultTypeId < 12) {
        return resultTypeId + 100;
    }

    return resultTypeId;
}