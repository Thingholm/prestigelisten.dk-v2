"use client";

import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function RemoveCompareableEntityButton({
    id,
    ids,
    param
}: Readonly<{
    id: number,
    ids: number[],
    param: string
}>) {
    const t = useTranslations("comparePage");

    const router = useRouter();

    const handleClick = () => {
        const params = new URLSearchParams();

        params.set(param, ids.filter(x => x != id).join(","))

        router.push(`${window.location.pathname}?${params}`)
    }

    return (
        <Button 
            color="secondary" 
            variant="text" 
            className="flex items-center justify-center mb-2 w-32 sm:w-36 md:w-50"
            onClick={handleClick}
        >
            <IoRemoveCircleOutline className="mr-2"/>
            {t("remove")}
        </Button>
    )
}