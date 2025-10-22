"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LocaleSwitcher({
    isMobile = false
}: Readonly<{
    isMobile?: boolean
}>) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <select
            value={locale}
            onChange={e => router.push(`${pathname.replace(`/${locale}`, `/${e.target.value}`)}?${searchParams.toString()}`)}
            className={`${isMobile ? "pl-16 py-1" : "text-primary-500"} bg-transparent`}
        >
            <option value="da" className={`${isMobile ? "" : "bg-secondary-950"}`}>da</option>
            <option value="en" className={`${isMobile ? "" : "bg-secondary-950"}`}>en</option>
        </select>
    )
}