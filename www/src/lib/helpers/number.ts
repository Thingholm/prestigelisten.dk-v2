export function toDecimals(input: number, decimals: number) {
    return Math.round(input * Math.pow(10, decimals)) / Math.pow(10, decimals)
}