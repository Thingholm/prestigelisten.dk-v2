import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import TableCell from "./TableCell";
import FlagSpan from "./FlagSpan";
import { getTeamUrl } from "@/lib/helpers/urls";

type Team = {
    id: number,
    name: string;
    nations?: {
        code: string;
    } | null;
}

export default function TeamNameCell({
    team,
    className = "",
    showFlagBreakpoint,
    isLink = true,
    isMain = false,
}: Readonly<{
    team?: Team | null;
    className?: string;
    showFlagBreakpoint?: ScreenBreakpoint | "always";
    isCell?: boolean;
    isLink?: boolean;
    isMain?: boolean;
}>) {
    const flagSpanVariants = {
        sm: "sm:!hidden",
        md: "md:!hidden",
        lg: "lg:!hidden",
        xl: "xl:!hidden",
        "2xl": "2xl:!hidden",
        always: "",
    };

    if (!team) {
        return (
            <TableCell className={`${className}`}>-</TableCell>
        )
    }

    return (
        <TableCell 
            className={`${className}`} 
            href={isLink ? getTeamUrl(team) : undefined}
        >
            <FlagSpan code={team.nations?.code} className={`${showFlagBreakpoint ? `${flagSpanVariants[showFlagBreakpoint]}` : "!hidden"}`}/>
            <span className={`${isMain ? "!font-semibold" : ""}`}>{team.name}</span>
        </TableCell>
    );
}