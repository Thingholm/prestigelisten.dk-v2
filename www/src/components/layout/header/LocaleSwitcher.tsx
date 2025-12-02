"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = (newLocale: string) => {
        router.push(`${pathname.replace(`/${locale}`, `/${newLocale}`)}?${searchParams.toString()}`);
    }

    return (
        <div className="flex gap-2 lg:gap-1">
            <div className="relative">
                <button className="fi fi-dk lg:h-4 lg:!w-5 h-6 !w-8 rounded-sm lg:rounded-xs cursor-pointer active:scale-90 duration-100" onClick={() => handleClick("da")}></button>
                {locale == "da" && <div className=" absolute -bottom-1 left-[calc(50%-0.125rem)] h-1 w-1 rounded-full bg-secondary-950 lg:bg-primary-500"></div>}
            </div>
            <div className="relative">
                <button className="fi fi-gb lg:h-4 lg:!w-5 h-6 !w-8 rounded-sm lg:rounded-xs cursor-pointer active:scale-90 duration-100" onClick={() => handleClick("en")}></button>
                {locale == "en" && <div className=" absolute -bottom-2 lg:-bottom-1 left-[calc(50%-0.125rem)] h-1 w-1 rounded-full bg-secondary-950 lg:bg-primary-500"></div>}
            </div>
        </div>
    )
}