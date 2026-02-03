import { Link } from "@/i18n/navigation"
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;
type Href = LinkProps['href'];

export default function ProfileAttribute({
    label,
    children,
    href
}: Readonly<{
    label: string,
    children: React.ReactNode,
    href?: Href
}>) {
    return(
        <p>
            <span>{label}: </span>
            <span className="font-semibold">
                {href 
                    ? <Link prefetch={false}  href={href} className="hover:underline">{children}</Link> 
                    : children
                }
            </span>
        </p>
    )
}