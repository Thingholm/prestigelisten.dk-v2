export function formatNumber(
    number?: number | null, 
    decimals?: number,
    locale: string = 'da-DK'
): string | null {
    if (!number) return null;

    const options: Intl.NumberFormatOptions = {};

    if (decimals !== undefined) {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = decimals;
    }

    return new Intl.NumberFormat(locale, options).format(number);
}