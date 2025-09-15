export const bench = <T>(fn: () => T, label: string) => {
    const t0 = performance.now();
    const res = fn();
    const t1 = performance.now();
    console.log(`${label}: ${(t1 - t0).toFixed(2)} ms`);
    return res;
};