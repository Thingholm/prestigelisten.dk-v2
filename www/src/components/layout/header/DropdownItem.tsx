import { Link } from "@/i18n/navigation"
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;
type Href = LinkProps['href'];

export default function DropdownItem({
    title,
    href,
    onClick
}: Readonly<{
    title: string,
    href: Href | string,
    onClick: () => void   
}>) {
    const handleOnClick = () => onClick();

    if (typeof href === "string") {
        return (
            <a
                href={href}
                className="text-primary-500 relative group/item w-fit"
                onClick={handleOnClick}
            >
                    <span>{title}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>

            </a>
        )
    }

    return (
        <Link prefetch={false} 
            href={href}
            className="text-primary-500 relative group/item w-fit"
            onClick={handleOnClick}
        >
                <span>{title}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>

        </Link>
    )
}