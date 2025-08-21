import { ReactElement } from "react";

export default function TableRow({
    children,
    className = "",
    isHighlighted = false,
    isFaded = false,
    hasBorder = true,
}: Readonly<{
    children: ReactElement<React.ComponentProps<"td">>[] | ReactElement<React.ComponentProps<"td">>;
    className?: string;
    isHighlighted?: boolean;
    isFaded?: boolean;
    hasBorder?: boolean;
}>) {
    const paramClassList = [];

    if (isHighlighted) paramClassList.push("bg-gray-200 font-semibold");

    if (isFaded) paramClassList.push("opacity-50");

    if (hasBorder) paramClassList.push("border-t-1");

    return (
        <tr className={`${paramClassList.join(" ")} border-t-gray-200 ${className}`}>
            {children}
        </tr>
    );
}