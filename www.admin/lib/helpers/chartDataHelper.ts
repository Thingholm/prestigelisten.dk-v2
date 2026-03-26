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
const steps = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000];

export function calculateTickValues(values: (number | null)[]) {
    const maxValue = Math.max(...values.filter(value => value != null));
    const minValue = 1;

    const range = maxValue - minValue;

    const rawStep = range / 5;

    const niceStep = steps.find(step => step >= rawStep) ?? steps[steps.length - 1];

    const niceMax = Math.ceil(maxValue / niceStep) * niceStep;

    const rawTicks = [1];
    for (let tick = niceStep; tick <= niceMax; tick += niceStep) {
        rawTicks.push(tick);
    }

    const ticks = [...new Set(rawTicks)];

    return {
        domain: [1, niceMax],
        ticks,
    };
}