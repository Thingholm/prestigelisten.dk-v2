import { formatNumber } from "@/lib/helpers/localeHelpers";
import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import SecondaryCellSpan from "./SecondaryCellSpan";
import { Link } from "@/i18n/navigation";
import { ComponentProps } from "react";

export type SecondarySpanProps = {
    content: React.ReactNode;
    breakpoint?: ScreenBreakpoint;
    inlineBreakpoint?: ScreenBreakpoint | "always";
}

type LinkProps = ComponentProps<typeof Link>;
type Href = LinkProps['href'];

export default function TableCell({
    children,
    className = "",
    href,
    colSpan,
    noFormat = false,
    secondarySpan,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    href?: Href;
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
                {href 
                    ? <Link prefetch={false}  href={href} className="hover:underline">{content}</Link>
                    : content
                }
            </span>
            {secondarySpan &&
                <SecondaryCellSpan breakpoint={secondarySpan.breakpoint} inlineBreakpoint={secondarySpan.inlineBreakpoint}>
                    {secondarySpanContent}
                </SecondaryCellSpan>
            }
        </td>
    );
}