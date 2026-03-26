import { formatNumber } from "@/lib/helpers/localeHelpers";
import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import SecondaryCellSpan from "./SecondaryCellSpan";

export type SecondarySpanProps = {
    content: React.ReactNode;
    breakpoint?: ScreenBreakpoint;
    inlineBreakpoint?: ScreenBreakpoint | "always";
}


export default function TableCell({
    children,
    className = "",
    colSpan,
    noFormat = false,
    secondarySpan,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    colSpan?: number;
    noFormat?: boolean;
    secondarySpan?: SecondarySpanProps;
}>) {
    let content = children;
    let secondarySpanContent = secondarySpan?.content;

    if (typeof children === "number" && !noFormat) {
        content = formatNumber(children);
    }

    if (typeof secondarySpan?.content === "number" && !noFormat) {
        secondarySpanContent = formatNumber(secondarySpan?.content);
    }

    return (
        <td className={`py-0.5 not-last:pr-1 ${className}`} colSpan={colSpan ?? 1}>
            <span>
                {content}
            </span>
            {secondarySpan &&
                <SecondaryCellSpan breakpoint={secondarySpan.breakpoint} inlineBreakpoint={secondarySpan.inlineBreakpoint}>
                    {secondarySpanContent}
                </SecondaryCellSpan>
            }
        </td>
    );
}