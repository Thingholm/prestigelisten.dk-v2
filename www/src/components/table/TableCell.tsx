import { formatNumber } from "@/lib/helpers/localeHelpers";
import Link from "next/link";

export default function TableCell({
    children,
    className = "",
    href,
    colspan,
    noFormat = false,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    href?: string;
    colspan?: number;
    noFormat?: boolean;
}>) {
    let content = children;

    if (typeof children === "number" && !noFormat) {
        content = formatNumber(children);
    }

    return (
        <td className={`${className} py-0.5 not-last:pr-1`} colSpan={colspan ?? 1}>
            {href 
                ? <Link href={href} className="hover:underline">{content}</Link>
                : content
            }
        </td>
    );
}