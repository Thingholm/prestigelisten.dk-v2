export function formatNumber(num: number, locale: string = 'da-DK'): string {
    return new Intl.NumberFormat(locale).format(num);
}