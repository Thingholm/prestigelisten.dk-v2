"use client";

import { urls } from "@/lib/constants/urls";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import DropdownGroup from "./DropdownGroup";
import DropdownItem from "./DropdownItem";
import { getRidersListUrl } from "@/lib/helpers/urls";

export default function DesktopNav() {
    const t = useTranslations("navigation")
    const locale = useLocale();

    const [isDropdownOpen, setIsDropdownOpen] = useState([false, false]);

    return (
        <nav className="text-primary-500 gap-x-4 text-sm 2xl:text-base 2xl:gap-x-8 hidden xl:flex">
            <Link prefetch={false}  href={{ pathname: "/point_scale" }} className="relative group/item w-fit">
                <span>{t("pointSystem")}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>
            </Link>
            <DropdownGroup
                title={t("lists")}
                isOpen={isDropdownOpen[0]}
                setIsOpen={(value: boolean) => setIsDropdownOpen(prev => [value, prev[1]])}
            >
                <DropdownItem
                    href={getRidersListUrl()}
                    title={t("ridersAlltime")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                <DropdownItem
                    href={getRidersListUrl({ status: "active" })}
                    title={t("active")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                <DropdownItem
                    href={getRidersListUrl({ isSingleYear: true })}
                    title={t("greatestByYear")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                {locale == "da" &&
                    <DropdownItem
                        href={getRidersListUrl({ nations: [14] })}
                        title={t("danish")}
                        onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                    />
                }
                <DropdownItem
                    href={{ pathname: "/rankings/nations" }}
                    title={t("nations")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                <DropdownItem
                    href={{ pathname: "/rankings/riders/greatest_seasons" }}
                    title={t("greatestSeasons")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                <DropdownItem
                    href={{ pathname: "/rankings/riders/ages" }}
                    title={t("greatestByAge")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
                <DropdownItem
                    href={{ pathname: "/rankings/riders/3-year_period" }}
                    title={t("3YearPeriod")}
                    onClick={() => setIsDropdownOpen(prev => [false, prev[1]])}
                />
            </DropdownGroup>
            <Link prefetch={false}  href={{ pathname: "/calendar" }} className="relative group/item w-fit">
                <span>{t("raceCalendar")}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>
            </Link>
            <Link prefetch={false}  href={{ pathname: "/year" }} className="relative group/item w-fit">
                <span>{t("seasonOverview")}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>
            </Link>
            <Link prefetch={false}  href={{ pathname: "/team" }} className="relative group/item w-fit">
                <span>{t("teams")}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>
            </Link>
            <DropdownGroup
                title={t("more")}
                isOpen={isDropdownOpen[1]}
                setIsOpen={(value: boolean) => setIsDropdownOpen(prev => [prev[0], value])}
            >
                <DropdownItem
                    href={urls["quiz"]}
                    title={t("quiz")}
                    onClick={() => setIsDropdownOpen(prev => [prev[0], false])}
                />
                <DropdownItem
                    href={{ pathname: "/compare" }}
                    title={t("compare")}
                    onClick={() => setIsDropdownOpen(prev => [prev[0], false])}
                />
            </DropdownGroup>
            <Link prefetch={false}  href={{ pathname: "/about_prestigelisten" }} className="relative group/item w-fit">
                <span>{t("about")}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/item:w-full"></span>
            </Link>
        </nav>
    )
}