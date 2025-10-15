import { getRaceUrl } from "@/lib/helpers/urls"
import Link from "next/link"

type MetaRace = {
    id: number;
    name: string;
}

export default function ResultNameListItem({
    resultName,
    metaRace,
    count,
    points,
    className
}: Readonly<{
    resultName: string
    metaRace: MetaRace
    count?: number
    points?: number,
    className?: string
}>) {
    return (
        <li className={`${className} relative`}>
            {count && count > 1 && 
                <span className="absolute right-full mr-2 opacity-70">{count}x</span>
            }
            <Link href={getRaceUrl(metaRace)} className="font-medium hover:underline">{resultName}</Link>
            {points &&
                <span className="opacity-70 ml-2 font-light">- {points}p</span>
            }
        </li>
    )
}