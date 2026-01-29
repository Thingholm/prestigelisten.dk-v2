import { IoCaretDown, IoCaretUp } from "react-icons/io5"
import { TiEquals } from "react-icons/ti"

export default function RankDisplay({
    rank,
    oldRank,
    title
}: Readonly<{
    rank: number,
    oldRank?: number | null,
    title: string
}>) {
    return (
        <div>
            <p>{title}</p>
            <div className="flex gap-1 items-center">
                <p className="text-4xl font-semibold">{rank}</p>
                {oldRank &&
                    <div className="mt-[3px]">
                        <p className="text-xs">
                        {rank > oldRank 
                            ? <span className="text-red-500 flex items-center"> 
                                    <IoCaretDown/>
                                    {oldRank - rank}
                                </span>
                            : rank < oldRank && <span className="text-green-500 flex items-center"> 
                                <IoCaretUp/>
                                {oldRank - rank}
                            </span>
                        }
                        {rank == oldRank &&
                            <span className="text-gray-400 flex items-center"> 
                                <TiEquals className="mb-0.5"/>
                                0
                            </span>                                                
                        }
                        </p>
                        <p className="text-md -mt-1">{oldRank}</p>
                    </div>
                }
            </div>            
        </div>
    )
}