"use client";

import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "@/components/table";
import FlagSpan from "@/components/table/FlagSpan";
import { PointSystem } from "@/db/pointSystem";
import { Race } from "@/db/race";
import { getRaceFlagCode } from "@/lib/helpers/raceFlags";
import { getRaceName } from "@/lib/helpers/raceName";
import { getRaceUrl } from "@/lib/helpers/urls";
import { Tables } from "@/utils/supabase/database.types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function RaceClassAccordion({
    raceClass,
    pointSystem,
    races
}: Readonly<{
    raceClass: Tables<"race_classes">,
    pointSystem: PointSystem,
    races: Race[]
}>) {
    const t = useTranslations("raceClasses");
    const tTableColumns = useTranslations("tableColumns");
    const tResultNames = useTranslations("getResultNames");

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isInUrl = window.location.hash === `#${raceClass.id}`;
            setIsOpen(isInUrl);
        }
    }, [raceClass.id]);

    races.sort((a, b) => a.meta_races.name.localeCompare(b.meta_races.name))

    const activeRaces = races.filter(race => race.race_class_id == raceClass.id && race.active);
    const inactiveRaces = races.filter(race => race.race_class_id == raceClass.id && !race.active).sort((a, b) => a.meta_races.name.localeCompare(b.meta_races.name)).sort((a, b) => b.results[0].max - a.results[0].max);

    if (activeRaces.length == 0 && inactiveRaces.length == 0) {
        return null;
    }

    return (
        <div className="bg-gray-100 shadow-sm w-full relative sm:-left-2 rounded-xl scroll-mt-20" id={raceClass.id.toString()}>
            <button className="flex items-center justify-between w-full hover:cursor-pointer rounded-xl hover:bg-gray-50 py-3 px-4" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-bold">{t(raceClass.id.toString())}</span>
                <IoChevronDown className={`duration-150 ${isOpen ? "rotate-180" : ""}`}/>
            </button>
            <div className={`${isOpen ? "block" : "hidden"} px-4`}>
                <div className="mt-2 bg-white px-4 pt-3 pb-2 rounded-xl">
                    <Table>
                        <TableHead>
                            <TableColumn>{tTableColumns("result")}</TableColumn>
                            <TableColumn className="w-16">{tTableColumns("points")}</TableColumn>
                        </TableHead>
                        <TableBody>
                            {pointSystem.filter(ps => ps.race_class_id == raceClass.id).map(ps => (
                                <TableRow key={ps.id}>
                                    <TableCell>{tResultNames(`resultTypes.${ps.result_type}`)}</TableCell>
                                    <TableCell>{ps.points}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <p className="font-bold mb-2 mt-4">{tTableColumns("races")}</p>
                <div className="grid lg:grid-cols-2 gap-x-8 gap-y-1 mb-4">
                    <div>
                        <p className="mb-1 font-medium hidden lg:block">{tTableColumns("active")}</p>
                        <div className="flex flex-col gap-y-1">
                            {activeRaces.map(race => (
                                <Link 
                                    key={race.id}
                                    href={getRaceUrl(race.meta_races)} 
                                    className="hover:underline"
                                >                                    
                                    <FlagSpan code={getRaceFlagCode(race.meta_races)}/>
                                    <span>{getRaceName(race.meta_races, tResultNames)} {race.active_span_string}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 font-medium hidden lg:block">{tTableColumns("inactive")}</p>
                        <div className="flex flex-col gap-y-1 opacity-60">
                            {inactiveRaces.filter(race => race.race_class_id == raceClass.id && !race.active).map(race => (
                                <Link 
                                    key={race.id}
                                    href={getRaceUrl(race.meta_races)} 
                                    className="hover:underline"
                                >
                                    <FlagSpan code={getRaceFlagCode(race.meta_races)}/>
                                    <span>{getRaceName(race.meta_races, tResultNames)} {race.active_span_string}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}