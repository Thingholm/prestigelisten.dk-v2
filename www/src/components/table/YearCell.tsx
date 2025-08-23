import { getYearUrl } from "@/lib/helpers/urls";
import TableCell from "./TableCell";

export default function YearCell({ 
    year,
    className = "",
}: { 
    year: number | null
    className?: string
}) {
    return (
        <TableCell 
            noFormat 
            href={getYearUrl(year)}
            className={className}
        >
            {year}
        </TableCell>
    )
}