import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import TableCell from "./TableCell";
import FlagSpan from "./FlagSpan";
import { getRaceUrl } from "@/lib/helpers/urls";
import React from "react";
import { getRaceFlagCode } from "@/lib/helpers/raceFlags";

type MetaRace = {
    id: number,
    name: string;
    nations?: {
        code: string;
    } | null;
}

export default function RaceCell({
    metaRace,
    children,
    className = "",
    showFlagBreakpoint,
    isLink = true,
    isMain = false,
}: Readonly<{
    metaRace: MetaRace;
    children: React.ReactNode;
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

    return (
        <TableCell 
            className={`${className}`} 
            href={isLink ? getRaceUrl(metaRace) : undefined}
        >
            <FlagSpan code={getRaceFlagCode(metaRace)} className={`${showFlagBreakpoint ? `${flagSpanVariants[showFlagBreakpoint]}` : "!hidden"}`}/>
            <span className={`${isMain ? "!font-semibold" : ""}`}>{children}</span>
        </TableCell>
    );
}