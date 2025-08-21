import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import Card from "./Card";

export default function Container({
    children,
    className = "",
    title,
    href,
    dark = false,
    isCard = false,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    title?: string;
    href?: string;
    dark?: boolean;
    isCard?: boolean;
}>) {
    const Heading = () => {
        return (
            <h3 className={`font-bold text-xl sm:text-2xl mb-3 relative inline-block group lg:text-nowrap`}>
                {title}
                {href && <IoArrowForward className="ml-3 inline-block"/>}
                {href && <div className={`absolute h-0.75 -bottom-0.5 w-0 ${dark ? "bg-white" : "bg-secondary-950"} duration-200 group-hover:w-full rounded-full`}></div>}
            </h3>
        )
    }

    return (
        <div className={`w-full ${className}`}>
            {title && (href 
                ? <Link href={href}><Heading /></Link>
                : <Heading />
            )}
            {isCard && <Card>{children}</Card>}
        </div>
    );
}