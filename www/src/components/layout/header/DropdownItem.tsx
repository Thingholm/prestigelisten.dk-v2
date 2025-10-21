import Link from "next/link"

export default function DropdownItem({
    title,
    href,
    onClick
}: Readonly<{
    title: string,
    href: string,
    onClick: () => void   
}>) {
    const handleOnClick = () => onClick();

    return (
        <Link
            href={href}
            className="text-primary-500 relative group/item w-fit"
            onClick={handleOnClick}
        >
                <span>{title}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>

        </Link>
    )
}