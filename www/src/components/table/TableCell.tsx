import { formatNumber } from "@/lib/helpers/localeHelpers";
import Link from "next/link";
import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import SecondaryCellSpan from "./SecondaryCellSpan";

export type SecondarySpanProps = {
    content: React.ReactNode;
    breakpoint: ScreenBreakpoint;
}

export default function TableCell({
    children,
    className = "",
    href,
    colspan,
    noFormat = false,
    secondarySpan,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    href?: string;
    colspan?: number;
    noFormat?: boolean;
    secondarySpan?: SecondarySpanProps;
}>) {
    let content = children;

    if (typeof children === "number" && !noFormat) {
        content = formatNumber(children);
    }

    return (
        <td className={`py-0.5 not-last:pr-1 ${className}`} colSpan={colspan ?? 1}>
            <span>
                {href 
                    ? <Link href={href} className="hover:underline">{content}</Link>
                    : content
                }
            </span>
            {secondarySpan &&
                <SecondaryCellSpan breakpoint={secondarySpan.breakpoint} >
                    {secondarySpan.content}
                </SecondaryCellSpan>
            }
        </td>
    );
}