"use client";

import { daysOfWeekHeaders, monthNames } from "@/lib/constants/calendar";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { PointSystem } from "@/db/pointSystem";
import { RaceEvent } from "./CalendarWrapper";
import { useMemo, useState } from "react";
import RaceSpan from "./RaceSpan";

type RaceEventWithDates = {
    id: number;
    name: string;
    race_class_id: number;
    meta_race_id: number;
    startDate: Date;
    endDate: Date;
    color: string | null;
    darkText: boolean;
}

export type RaceSpanItem = {
    race: RaceEventWithDates
    startColumnGrid: number,
    spanGrid: number,
}

export default function Calendar({
    calendar,
    pointSystem
}: Readonly<{
    calendar: RaceEvent[],
    pointSystem: PointSystem
}>) {
    const t = useTranslations("calendar");

    const [currentDisplayDate, setCurrentDisplayDate] = useState(() => {
        const today = new Date();
        return new Date(2025, today.getFullYear() === 2025 ? today.getMonth() : 0, 1);
    });

    const parsedRaces = useMemo(() => {
        return calendar.map(race => { 
            const start = new Date(race.startDate);
            const end = new Date(race.endDate);

            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            return { ...race, startDate: start, endDate: end };
        });
    }, []);

    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth();

    const handlePrevMonth = () => {
        setCurrentDisplayDate(prevDate => {
        const newMonth = prevDate.getMonth() - 1;
        if (prevDate.getFullYear() === 2025 && newMonth >= 0) {
            return new Date(2025, newMonth, 1);
        }
        return prevDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDisplayDate(prevDate => {
        const newMonth = prevDate.getMonth() + 1;
        if (prevDate.getFullYear() === 2025 && newMonth <= 11) {
            return new Date(2025, newMonth, 1);
        }
        return prevDate;
        });
    };

    const calendarGridCells = useMemo(() => {
        const cells = [];
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfCurrentMonth = new Date(year, month, 1).getDay();
        
        const leadingEmptyCells = (firstDayOfCurrentMonth === 0) ? 6 : firstDayOfCurrentMonth - 1;

        const prevMonthLastDate = new Date(year, month, 0);
        for (let i = 0; i < leadingEmptyCells; i++) {
            const day = prevMonthLastDate.getDate() - leadingEmptyCells + i + 1;
            cells.push({
                date: new Date(year, month - 1, day, 0, 0, 0, 0),
                dayOfMonth: day,
                isCurrentMonth: false,
            });
        }

        for (let i = 1; i <= daysInCurrentMonth; i++) {
            cells.push({
                date: new Date(year, month, i, 0, 0, 0, 0),
                dayOfMonth: i,
                isCurrentMonth: true,
            });
        }

        const totalCellsInGrid = Math.ceil((leadingEmptyCells + daysInCurrentMonth) / 7) * 7;
        const trailingEmptyCells = totalCellsInGrid - cells.length;

        for (let i = 1; i <= trailingEmptyCells; i++) {
            cells.push({
                date: new Date(year, month + 1, i, 0, 0, 0, 0),
                dayOfMonth: i,
                isCurrentMonth: false,
            });
        }
        return cells;
    }, [year, month]);

    const weeksToDisplay = useMemo(() => {
        const newWeeks = [];
        for (let i = 0; i < calendarGridCells.length; i += 7) {
            const weekDays = calendarGridCells.slice(i, i + 7);
            if (weekDays.length === 0) continue;

            const weekStartDate = weekDays[0].date;
            const weekEndDate = weekDays[weekDays.length - 1].date; 
            
            const raceEventsInWeekLayout: RaceSpanItem[] = [];

            parsedRaces.forEach(race => {
                const raceStartsBeforeOrDuringWeek = race.startDate <= weekEndDate;
                const raceEndsDuringOrAfterWeek = race.endDate >= weekStartDate;

                if (raceStartsBeforeOrDuringWeek && raceEndsDuringOrAfterWeek) {
                    let startDayIndexInWeek = -1;
                    let endDayIndexInWeek = -1;

                    for (let dayIdx = 0; dayIdx < weekDays.length; dayIdx++) {
                        const currentDayInWeek = weekDays[dayIdx].date;
                        if (currentDayInWeek >= race.startDate && currentDayInWeek <= race.endDate) {
                            if (startDayIndexInWeek === -1) {
                                startDayIndexInWeek = dayIdx;
                            }
                            endDayIndexInWeek = dayIdx;
                        }
                    }
                
                    if (startDayIndexInWeek !== -1) {
                        const spanInWeek = endDayIndexInWeek - startDayIndexInWeek + 1;
                        raceEventsInWeekLayout.push({
                            race,
                            startColumnGrid: startDayIndexInWeek + 1,
                            spanGrid: spanInWeek,
                        });
                    }
                }
            });
            
            raceEventsInWeekLayout.sort((a, b) => {
                if (a.race.startDate.getTime() !== b.race.startDate.getTime()) {
                    return a.race.startDate.getTime() - b.race.startDate.getTime();
                }
                return b.spanGrid - a.spanGrid;
            });

            newWeeks.push({
                days: weekDays,
                raceLayout: raceEventsInWeekLayout,
            });
        }
        return newWeeks;
    }, [calendarGridCells, parsedRaces]);


    return (
        <div className="py-4 md:py-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <Button
                    onClick={handlePrevMonth}
                    disabled={year === 2025 && month === 0}
                >
                    &lt; {t("previous")}
                </Button>
                <h2 className="text-xl font-bold">
                    {t("months." + monthNames[month])} {year}
                </h2>
                <Button
                    onClick={handleNextMonth}
                    disabled={year === 2025 && month === 11}
                >
                    {t("next")} &gt;
                </Button>
            </div>

            <div className=""> 
                <div className="grid grid-cols-7">
                    {daysOfWeekHeaders.map(day => (
                        <div key={day} className="text-center font-semibold text-sm py-3 border-b border-gray-300">
                            <span className="hidden sm:block">{t("daysOfWeek." + day)}</span>
                            <span className="block sm:hidden">{t("daysOfWeek." + day).slice(0, 3)}</span>
                        </div>
                    ))}
                </div>

                {weeksToDisplay.map((week, weekIndex) => (
                    <div
                        key={`week-${weekIndex}-${week.days[0]?.date.toISOString()}`}
                        className="grid grid-cols-7 relative border-t border-gray-200"
                        style={{ minHeight: '6.4rem' }}
                    >
                        {week.days.map((dayCell, dayIndexInWeek) => (
                            <div
                                key={`day-${dayIndexInWeek}-${dayCell.date.toISOString()}`}
                                className={`p-1 pt-0 border-l border-gray-300 ${ dayIndexInWeek === 0 ? 'border-l-0' : ''} 
                                    ${(dayCell.date.getDate() + "" + dayCell.date.getMonth()) === (new Date().getDate() + "" + new Date().getMonth()) 
                                        ? 'bg-gray-200 hover:bg-gray-300' 
                                        : dayCell.isCurrentMonth 
                                            ? 'bg-white hover:bg-gray-50'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-300'
                                    } 
                                    transition-colors duration-150 ease-in-out
                                `}
                            >
                                <span className={`text-sm ${(dayCell.date.getDate() + "" + dayCell.date.getMonth()) === (new Date().getDate() + "" + new Date().getMonth()) ? 'font-bold' : 'font-medium'} ${dayCell.isCurrentMonth ? 'text-gray-700' : 'text-gray-500'}`}>
                                    {dayCell.dayOfMonth}
                                </span>
                            </div>
                        ))}

                        {week.raceLayout.map((raceItem, raceIdx) => (
                            <RaceSpan 
                                raceItem={raceItem} 
                                raceId={raceIdx} 
                                week={week}
                                pointSystem={pointSystem}
                                weekIndex={weekIndex}
                                key={`race-${weekIndex}-${raceItem.race.id}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}