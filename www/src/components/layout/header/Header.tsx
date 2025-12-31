import { urls } from "@/lib/constants/urls";
import { getTranslations } from "next-intl/server";
import DesktopNav from "./DesktopNav";
import { getNavSearchbarData } from "@/db/navSearhbar";
import Button from "@/components/ui/Button";
import { getRidersListUrl } from "@/lib/helpers/urls";
import NavSearchBar from "./NavSearchBar";
import MobileNav from "./MobileNav";
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/navigation";

export default async function Header() {
    const t = await getTranslations("navigation");

    const searchData = await getNavSearchbarData();

    return (
        <header className="fixed top-0 left-0 w-full bg-secondary-950 py-1 sm:py-2 px-3 sm:px-16 z-50 flex items-center justify-between">
            <h1 className="text-primary-500 uppercase text-2xl 2xl:text-3xl font-bold"><Link href={{ pathname: "/" }}>Prestigelisten</Link></h1> 
            <DesktopNav/>
            <div className="hidden xl:flex items-center gap-x-2">
                <LocaleSwitcher/>
                <NavSearchBar searchBarData={searchData}/>
                <div className="w-[1px] bg-primary-500 h-8"></div>
                <Button href={getRidersListUrl()} className="!py-1.5">{t("seeList")}</Button>
            </div>
            <MobileNav searchData={searchData}/>
        </header>
    )
}