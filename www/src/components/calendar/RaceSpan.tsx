import { PointSystem } from "@/db/pointSystem";
import { RaceSpanItem } from "./Calendar";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { shift, useFloating, useHover, useInteractions } from "@floating-ui/react";
import { getRaceUrl } from "@/lib/helpers/urls";
import { getRaceName } from "@/lib/helpers/raceName";
import { useRouter } from "next/navigation";
import { getSuffix } from "@/lib/helpers/resultNames";

export default function RaceSpan({
    raceItem,
    raceId,
    week,
    weekIndex,
    pointSystem
}: Readonly<{
    raceItem: RaceSpanItem,
    raceId: number,
    week: {
        raceLayout: Array<{
            startColumnGrid: number;
            spanGrid: number;
        }>;
    };    
    weekIndex: number,
    pointSystem: PointSystem,
}>) {
    const tResultNames = useTranslations("getResultNames");
    const tRaceClasses = useTranslations("raceClasses");
    const tMonths = useTranslations("calendar.months");
    const tSuffixes = useTranslations("suffixes");

    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();

    const metaRace = {id: raceItem.race.meta_race_id, name: raceItem.race.name};
    
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            shift({
                padding: 8,
                crossAxis: true,
                mainAxis: true
            })
        ]
    })

    const hover = useHover(context);

    const { getReferenceProps } = useInteractions([
        hover,
    ]);

    const formatDate = (date: Date, tMonths: ReturnType<typeof useTranslations>) => {
        const day = `${date.getDate()}${tSuffixes(`${getSuffix(date.getDate())}`)}`;
        const month = tMonths(date.toLocaleString('en-US', { month: 'long' }).toLowerCase());
        const year = date.getFullYear();

        if (locale == "en") {
            return `${month} ${day} ${year}`;
        }

        return `${day} ${month} ${year}`;
    }

    const handleClick = () => {
        router.push(getRaceUrl(metaRace))
    }

    return (
        <>
            <button
                key={`race-${weekIndex}-${raceItem.race.id}`}
                {...getReferenceProps()}
                ref={refs.setReference}
                className={`absolute text-xs ${raceItem.race.darkText ? '' : 'text-white'} text-left mx-1 p-1.5 pt-1 rounded shadow-sm overflow-hidden truncate hover:opacity-90 transition-opacity duration-150 ease-in-out select-none`}
                style={{
                    backgroundColor: raceItem.race.color ?? "",
                    left: `${((raceItem.startColumnGrid - 1) / 7) * 100}%`,
                    width: `calc(${(raceItem.spanGrid / 7) * 100}% - 8px)`,
                    top: `${22 + (week.raceLayout
                        .slice(0, raceId)
                        .filter(other =>
                            Math.max(
                                raceItem.startColumnGrid,
                                other.startColumnGrid
                            ) <= Math.min(
                                raceItem.startColumnGrid + raceItem.spanGrid - 1,
                                other.startColumnGrid + other.spanGrid - 1
                            )
                        ).length * 26)}px`,
                    height: '22px',
                    zIndex: 10 + raceId,
                }}
                onClick={handleClick}
            >
                {getRaceName(metaRace, tResultNames)}
            </button>
            {isOpen && 
                <div 
                    ref={refs.setFloating} 
                    style={floatingStyles}
                    className={`bg-secondary-950 text-white z-50 flex flex-col px-4 py-2 rounded-md mt-1 text-center shadow-lg`}
                >
                    <p className="text-sm opacity-70 mb-3">{formatDate(raceItem.race.startDate, tMonths)}{raceItem.race.startDate.getMonth() == raceItem.race.endDate.getMonth() && raceItem.race.startDate.getDate() == raceItem.race.endDate.getDate() ? "" : ` - ${formatDate(raceItem.race.endDate, tMonths)}`}</p>
                    <p className="font-bold">{getRaceName(metaRace, tResultNames)}</p>
                    <p className="text-sm opacity-70 mb-3">{tRaceClasses(raceItem.race.race_class_id.toString())}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        {pointSystem.filter(ps => ps.race_class_id === raceItem.race.race_class_id).map(ps => (
                            <div key={ps.id} className="text-sm flex flex-col items-center justify-center">
                                <span className="font-semibold">{tResultNames(`resultTypes.${ps.result_type_id}`)}</span>
                                <span className="opacity-70">{ps.points}p</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}