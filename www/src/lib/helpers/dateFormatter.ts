export function formatDate(
    dateString: string | null | undefined, 
    { includeYear = false }: { includeYear?: boolean } = {}
): string {
    if (!dateString) return "";

    const date = new Date(dateString);

    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}${includeYear ? `-${date.getFullYear()}` : ''}`;
}

export const getDateString = (date: string | undefined, locale: string): string => {
    if (!date) return "";

    if (locale === "da") {
        return `${date.split("-")[2]}-${date.split("-")[1]}`
    }

    if (locale === "en") {
        return `${date.split("-")[1]}-${date.split("-")[2]}`
    }

    return `${date.split("-")[1]}-${date.split("-")[2]}`
}