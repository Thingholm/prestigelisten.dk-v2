import { getNationUrl } from "@/lib/helpers/urls";
import FlagSpan from "./FlagSpan";
import TableCell from "./TableCell";
import { useTranslations } from "next-intl";

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
    nation?: Nation;
    className?: string;
    isMain?: boolean;
    isLink?: boolean;
}>) {
    const t = useTranslations("nations");
    const nationName = nation
        ? ((nation.code && nation.code != "xx") 
            ? t(`${nation.code}.name`)
            : nation.name)
        : "-";
        

    if (!nation) {
        return (
            <TableCell className={className}>-</TableCell>
        )
    }

    return (
        <TableCell className={`${className}`} href={isLink ? getNationUrl(nation) : undefined}>
            <FlagSpan code={nation.code} />
            <span className={`${isMain ? "!font-semibold" : ""}`}>{nationName}</span>
        </TableCell>
    );
}