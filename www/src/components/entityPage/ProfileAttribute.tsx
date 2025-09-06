import Link from "next/link"

export default function ProfileAttribute({
    label,
    children,
    href
}: Readonly<{
    label: string,
    children: React.ReactNode,
    href?: string
}>) {
    return(
        <p>
            <span>{label}: </span>
            <span className="font-semibold">
                {href 
                    ? <Link href={href} className="hover:underline">{children}</Link> 
                    : children
                }
            </span>
        </p>
    )
}