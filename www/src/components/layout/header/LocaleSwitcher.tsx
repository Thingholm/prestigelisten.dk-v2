"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = (newLocale: string) => {
        router.push(
            // @ts-ignore
            { pathname: pathname, query: Object.fromEntries(searchParams.entries()) },
            { locale: newLocale }
        );
    }

    return (
        <div className="flex lg:flex-col 2xl:flex-row gap-2 lg:gap-0 2xl:gap-2">
            <div className="relative">
                <button className="fi fi-dk lg:h-[0.9375rem] lg:!w-5 h-6 !w-8 rounded-sm lg:rounded-xs cursor-pointer active:scale-90 duration-100" onClick={() => handleClick("da")}></button>
                {locale == "da" && <div className="absolute -bottom-2 lg:-bottom-[calc(-50%+0.125rem)] 2xl:-bottom-1 left-[calc(50%-0.125rem)] lg:-left-2 2xl:left-[calc(50%-0.125rem)] h-1 w-1 rounded-full bg-secondary-950 lg:bg-primary-500"></div>}
            </div>
            <div className="relative">
                <button className="fi fi-gb lg:h-[0.9375rem] lg:!w-5 h-6 !w-8 rounded-sm lg:rounded-xs cursor-pointer active:scale-90 duration-100" onClick={() => handleClick("en")}></button>
                {locale == "en" && <div className="absolute -bottom-2 lg:-bottom-[calc(-50%+0.125rem)] 2xl:-bottom-1 left-[calc(50%-0.125rem)] lg:-left-2 2xl:left-[calc(50%-0.125rem)] h-1 w-1 rounded-full bg-secondary-950 lg:bg-primary-500"></div>}
            </div>
        </div>
    )
}