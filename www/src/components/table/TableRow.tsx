import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import { ReactElement } from "react";

export type ResponsiveSliceProps = {
    breakpoint: ScreenBreakpoint;
    end: number;
    rowIndex: number;
}

export default function TableRow({
    children,
    className = "",
    isHighlighted = false,
    isFaded = false,
    hasBorder = true,
    responsiveSlice,
    id,
}: Readonly<{
    children: ReactElement<React.ComponentProps<"td">>[] | ReactElement<React.ComponentProps<"td">>;
    className?: string;
    isHighlighted?: boolean;
    isFaded?: boolean;
    hasBorder?: boolean;
    responsiveSlice?: ResponsiveSliceProps;
    id?: string;
}>) {
    const paramClassList = [];

    if (isHighlighted) paramClassList.push("bg-gray-200 font-semibold");

    if (isFaded) paramClassList.push("opacity-50");

    if (hasBorder) paramClassList.push("not-first:border-t-1");

    const responsiveSliceClass = responsiveSlice && (responsiveSlice.rowIndex >= responsiveSlice.end) 
        ? `hidden ${responsiveSlice.breakpoint}:table-row` 
        : "";

    return (
        <tr className={`${paramClassList.join(" ")} border-t-gray-200 ${responsiveSliceClass} ${className}`} id={id}>
            {children}
        </tr>
    );
}