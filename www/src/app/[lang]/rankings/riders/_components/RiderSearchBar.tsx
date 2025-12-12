import SearchBar from "@/components/ui/SearchBar";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { Ranked } from "@/lib/helpers/rank";
import { getRiderName } from "@/lib/helpers/riderName";
import { Dispatch, SetStateAction } from "react";

export type RidersSearchBarResetHandle = {
    reset: () => void;
};

export default function RidersSearchBar({ 
    riders, 
    setRange, 
    setHighlightedRiderId 
}: Readonly<{
    riders: Ranked<RiderPointsWithNationAndTeam[number]>[],
    setRange: Dispatch<SetStateAction<number>>,
    setHighlightedRiderId: Dispatch<SetStateAction<number | null>>
}>) {
    const handleClick = (rider: {id: number, value: string, index?: number}) => {
        if (rider.index !== undefined && typeof setRange === 'function') {
            setRange(Math.ceil((rider.index + 1) / 100) * 100);
            setHighlightedRiderId(rider.id);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const element = document.getElementById(`rider-${rider.id}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            });
        } else {
            setHighlightedRiderId(rider.id);
            const element = document.getElementById(`rider-${rider.id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    return (        
        <div className="z-10">
            <SearchBar 
                data={riders.map((rider, index) => ({id: rider.id, value: getRiderName(rider.riders) || "", index: index}))} 
                onClick={handleClick}
                className="max-w-128"
            />
        </div>
    )
}