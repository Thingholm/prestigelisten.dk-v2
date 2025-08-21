import { getNationUrl } from "@/lib/helpers/urls";
import FlagSpan from "./FlagSpan";
import TableCell from "./TableCell";

type Nation = {
    id: number;
    name: string;
    code: string;
}

export default function NationNameCell({
    nation,
    className = "",
    isMain = false,
    isLink = true,
}: Readonly<{
    nation: Nation;
    className?: string;
    isMain?: boolean;
    isLink?: boolean;
}>) {
    return (
        <TableCell className={`${className}`} href={isLink ? getNationUrl(nation) : undefined}>
            <FlagSpan code={nation.code} />
            <span className={`${isMain ? "font-medium" : ""}`}>{nation.name}</span>
        </TableCell>
    );
}