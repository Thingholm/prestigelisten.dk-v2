import { Link } from "@/i18n/navigation"
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;
type Href = LinkProps['href'];

export default function MobileNavItem({
    href,
    onClick,
    title
}: Readonly<{
    href: Href | string,
    onClick: () => void,
    title: string
}>) {
    if (typeof href == "string") {
        return (
            <a
                href={href}
                onClick={() => onClick()}
                className="hover:underline py-1 inline-block"
            >
                {title}
            </a>
        )
    }

    return (
        <Link
            href={href}
            onClick={() => onClick()}
            className="hover:underline py-1 inline-block"
        >
            {title}
        </Link>
    )
}