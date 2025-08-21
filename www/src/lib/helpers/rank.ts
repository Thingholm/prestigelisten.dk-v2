export type Ranked<T> = T & { rank: number };

export function rankBy<T>(items: T[], key: keyof T, direction: "asc" | "desc" = "desc"): Ranked<T>[] {
    const sortedItems = [...items].sort((a, b) => {
        const aVal = a[key] as number;
        const bVal = b[key] as number;
        return direction === 'desc' ? bVal - aVal : aVal - bVal;
    });

    let rank = 1;
    return sortedItems.map((item, index) => {
        if (index > 0 && sortedItems[index - 1][key] !== item[key]) {
        rank = index + 1;
        }
        return { ...item, rank: rank };
  });
}