"use client";

import { NavSearchbarData } from "@/db/navSearhbar";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import MobileNavItem from "./MobileNavItem";
import { urls } from "@/lib/constants/urls";
import { IoChevronForward } from "react-icons/io5";
import { getRidersListUrl } from "@/lib/helpers/urls";
import Button from "@/components/ui/Button";
import NavSearchBar from "./NavSearchBar";
import LocaleSwitcher from "./LocaleSwitcher";

export default function MobileNav({
    searchData
}: Readonly<{
    searchData: NavSearchbarData
}>) {
    const t = useTranslations("navigation");
    const locale = useLocale();

    const [showNav, setShowNav] = useState(false);
    const [showLists, setShowLists] = useState(false);

    return (
        <div className="lg:hidden">
            <button 
                className="lg:hidden relative w-9 h-8"
                onClick={() => setShowNav(s => !s)}
            >
                <div className={`absolute h-1 w-full bg-primary-500 rounded-full duration-200 ${showNav ? "rotate-225 top-4" : "top-2.5"}`}></div>
                <div className={`absolute h-1 right-0 bg-primary-500 rounded-full duration-200 ${showNav ? "-rotate-225 w-full top-4" : "w-3/4 top-5"}`}></div>
            </button>     
            <div className={`${showNav ? "right-0" : "-right-full"} max-w-[90vw] sm:w-md text-end overflow-y-auto top-[2.8125rem] sm:top-[3.35rem] duration-150 absolute lg:hidden bg-white h-[calc(100vh-2.81rem)] sm:h-[calc(100vh-3.35rem)] px-3 sm:px-16 pt-2 items-end flex flex-col -z-10`}>
                <NavSearchBar searchBarData={searchData} isMobile setShowNav={setShowNav}/>
                <nav className="flex flex-col items-end mt-2 w-full">            
                    <MobileNavItem
                        href={urls["pointSystem"]}
                        onClick={() => setShowNav(false)}
                        title={t("pointSystem")}
                    />
                    <button className={`relative pr-5 sm:pr-0 hover:cursor-pointer hover:underline`} onClick={() => setShowLists(s => !s)}>
                        <span>{t("lists")}</span>
                        <IoChevronForward className={`${showLists ? "rotate-90" : ""} absolute top-1 right-0 sm:-right-5`}/>
                    </button>
                    {showLists && 
                        <div className="relative flex flex-col items-end pr-5 sm:pr-0">
                            <MobileNavItem
                                href={getRidersListUrl()}
                                title={t("ridersAlltime")}
                                onClick={() => setShowNav(false)}
                            />
                            <MobileNavItem
                                href={getRidersListUrl({ status: "active" })}
                                title={t("active")}
                                onClick={() => setShowNav(false)}
                            />
                            <MobileNavItem
                                href={getRidersListUrl({ isSingleYear: true })}
                                title={t("greatestByYear")}
                                onClick={() => setShowNav(false)}
                            />                  
                            {locale == "da" &&          
                                <MobileNavItem
                                    href={getRidersListUrl({ nations: [14] })}
                                    title={t("danish")}
                                    onClick={() => setShowNav(false)}
                                />
                            }
                            <MobileNavItem
                                href={urls["listNations"]}
                                title={t("nations")}
                                onClick={() => setShowNav(false)}
                            />
                            <MobileNavItem
                                href={urls["listRidersGreatestSeasons"]}
                                title={t("greatestSeasons")}
                                onClick={() => setShowNav(false)}
                            />
                            <MobileNavItem
                                href={urls["listRidersAges"]}
                                title={t("greatestByAge")}
                                onClick={() => setShowNav(false)}
                            />
                            <MobileNavItem
                                href={urls["listRiders3YearPeriod"]}
                                title={t("3YearPeriod")}
                                onClick={() => setShowNav(false)}
                            />
                            <div className="absolute w-0.5 h-[calc(100%-0.9rem)] right-[0.35rem] sm:-right-[0.85rem] top-2 bg-secondary-950"></div>
                        </div>
                    }
                    <MobileNavItem
                        href={urls["calendar"]}
                        title={t("raceCalendar")}
                        onClick={() => setShowNav(false)}
                    />
                    <MobileNavItem
                        href={urls["year"]}
                        title={t("seasonOverview")}
                        onClick={() => setShowNav(false)}
                    />
                    <MobileNavItem
                        href={urls["team"]}
                        title={t("teams")}
                        onClick={() => setShowNav(false)}
                    />
                    <MobileNavItem
                        href={urls["quiz"]}
                        title={t("quiz")}
                        onClick={() => setShowNav(false)}
                    />
                    <MobileNavItem
                        href={urls["compare"]}
                        title={t("compare")}
                        onClick={() => setShowNav(false)}
                    />
                    <MobileNavItem
                        href={urls["about"]}
                        onClick={() => setShowNav(false)}
                        title={t("about")}
                    />    
                    <Button href={getRidersListUrl()} className="mt-2 mb-2">{t("seeList")}</Button>
                    <LocaleSwitcher/>
                </nav>
            </div>
            <div className={`${showNav ? "left-0" : "left-full"} top-[2.8125rem] sm:top-[3.35rem] absolute lg:hidden -z-20`}>
                <div 
                    className={`${showNav ? "opacity-50" : "opacity-0"} duration-150 bg-secondary-950 absolute top-0 left-0 w-screen h-screen`}
                    onClick={() => setShowNav(false)}
                ></div>
            </div>
        </div>
    )
}