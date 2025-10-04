export function connectDataNulls<
    T extends Record<string, unknown>, 
    K extends keyof T, 
    V extends keyof T
>(
    data: T[],
    key: K,
    value: V
): (T & { [P in V]: T[V] | null })[] {    
    if (data.length === 0) return [];

    const start = data[0][key] as unknown as number;
    const end = data[data.length - 1][key] as unknown as number;
    const dataLength = end - start + 1;

    const connectedData = Array.from({ length: dataLength }, (_, index) => {
        const currentKey = start + index;
        const entry = data.find(item => item[key] === currentKey) ?? null;

        if (!entry) {
        return {
            ...({} as T),
            [key]: currentKey,
            [value]: null,
        };
        }

        return entry;
    });

    return connectedData;
}