export function formatNumber(number?: number | null, locale: string = 'da-DK'): string | null {
    if (!number) return null;

    return new Intl.NumberFormat(locale).format(number);
}