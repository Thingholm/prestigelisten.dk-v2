import Link from "next/link"

export default function MobileNavItem({
    href,
    onClick,
    title
}: Readonly<{
    href: string,
    onClick: () => void,
    title: string
}>) {
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