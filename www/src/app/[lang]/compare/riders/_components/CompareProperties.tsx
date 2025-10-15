import { TableCell, TableRow } from "@/components/table";

export default function CompareProperties({
    value1,
    value2,
    title,
    reverseComparison = false
}: Readonly<{
    value1: number | null | undefined,
    value2: number | null | undefined,
    title: string,
    reverseComparison?: boolean
}>) {
    const getColorFromComparison = (baseValue: number | null | undefined, compareValue: number | null | undefined) => {
        if (!baseValue || !compareValue || baseValue == compareValue) return "";

        if (reverseComparison ? baseValue < compareValue : baseValue > compareValue) return "text-green-500";
        
        return "text-red-500"
    }

    return (
        <TableRow>
            <TableCell className={`${getColorFromComparison(value1, value2)} w-1/4 md:text-end`}>{value1 ?? "-"}</TableCell>
            <TableCell className="w-1/2 text-center">{title}</TableCell>
            <TableCell className={`${getColorFromComparison(value2, value1)} w-1/4 text-end md:text-start`}>{value2 ?? "-"}</TableCell>
        </TableRow>
    )
}