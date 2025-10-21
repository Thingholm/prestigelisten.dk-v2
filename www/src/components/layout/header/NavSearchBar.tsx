"use client";

import { NavSearchbarData } from "@/db/navSearhbar";
import { getRaceName } from "@/lib/helpers/raceName";
import { getRiderName } from "@/lib/helpers/riderName";
import { getNationUrl, getRaceUrl, getRiderUrl, getTeamUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

export default function NavSearchBar({
    searchBarData
}: Readonly<{
    searchBarData: NavSearchbarData
}>) {
    const t = useTranslations("navigation");
    const tNations = useTranslations("nations");
    const tResultNames = useTranslations("getResultNames");

    const [showSeachBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const riders = searchBarData.riders.filter(rider => getRiderName(rider).toLowerCase().includes(searchValue.toLowerCase()));
    const nations = searchBarData.nations.filter(nation => tNations(`${nation.code}.name`).toLowerCase().includes(searchValue.toLowerCase()));
    const races = searchBarData.races.filter(race => getRaceName(race, tResultNames).toLowerCase().includes(searchValue.toLowerCase()));
    const teams = searchBarData.teams.filter(team => team.name.toLowerCase().includes(searchValue.toLowerCase()));

    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowSearchBar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setShowSearchBar && setShowSearchBar(false);
        setSearchValue("");
    }

    return (
        <div ref={ref} className="relative z-10">
            <button className="p-2 rounded-md hover:bg-secondary-900" onClick={() => setShowSearchBar(state => !state)}>
                <IoSearchOutline className="text-primary-500" size={22}/>
            </button>
            <div className={`${showSeachBar ? "w-[50vw] xl:w-[60vw]" : "w-0"} absolute text-neutral-100 bg-secondary-800 right-0 top-0 h-full rounded-md -z-10 duration-300`}>
                <input
                    type="text"
                    className={`${showSeachBar ? "px-4": ""} w-full h-full rounded-med outline-none bg-transparent`}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder={t("searchFull")}
                />
                {searchValue && showSeachBar &&
                    <button className="right-9 cursor-pointer h-full top-0 px-2 absolute" onClick={() => setSearchValue("")}>
                        <IoCloseOutline className={`text-secondary-300`} size={20}/>
                    </button>
                }
                {searchValue.length > 1 && showSeachBar && [...riders, ...nations, ...races, ...teams].length > 0 && 
                    <div className={`w-full absolute left-0 top-7 pt-5 bg-secondary-800 rounded-md`}>
                        {riders?.length > 0 &&
                            <>
                                <p className="px-4 opacity-50 font-semibold uppercase">{t("searchRiders")}</p>
                                {riders.slice(0, 7).map(rider => (
                                    <Link
                                        key={rider.id}
                                        href={getRiderUrl(rider)}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-1 hover:bg-secondary-900"
                                    >
                                        {getRiderName(rider)}
                                    </Link>
                                ))}
                            </>
                        }
                        {nations?.length > 0 &&
                            <>
                                <p className="px-4 opacity-50 font-semibold uppercase">{t("searchNations")}</p>
                                {nations.slice(0, 5).map(nation => (
                                    <Link
                                        key={nation.id}
                                        href={getNationUrl(nation)}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-1 hover:bg-secondary-900"
                                    >
                                        {tNations(`${nation.code}.name`)}
                                    </Link>
                                ))}
                            </>
                        }
                        {races?.length > 0 &&
                            <>
                                <p className="px-4 opacity-50 font-semibold uppercase">{t("searchRaces")}</p>
                                {races.slice(0, 4).map(race => (
                                    <Link
                                        key={race.id}
                                        href={getRaceUrl(race)}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-1 hover:bg-secondary-900"
                                    >
                                        {getRaceName(race, tResultNames)}
                                    </Link>
                                ))}
                            </>
                        }
                        {teams?.length > 0 &&
                            <>
                                <p className="px-4 opacity-50 font-semibold uppercase">{t("searchTeams")}</p>
                                {teams.slice(0, 3).map(team => (
                                    <Link
                                        key={team.id}
                                        href={getTeamUrl(team)}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-1 hover:bg-secondary-900"
                                    >
                                        {team.name}
                                    </Link>
                                ))}
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}