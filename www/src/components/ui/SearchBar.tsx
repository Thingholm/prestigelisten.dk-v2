"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

type SearchData = {
    id: number;
    value: string;
    index?: number;
}

export default function SearchBar({
    data,
    onClick,
    disabled,
    className
}: Readonly<{
    data: SearchData[],
    onClick: (item: SearchData) => void,
    disabled?: boolean,
    className?: string
}>) {
    const t = useTranslations("searchBar");

    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const ref = useRef<HTMLInputElement>(null);

    const filteredData = data
        .filter((item) => item.value.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsFocused(false);
        }
    }

    const handleReset = () => {
        setQuery("");
        setIsFocused(false);
    }

    const handleClick = (item: SearchData) => {
        handleReset();
        if (typeof onClick === 'function') {
            onClick(item);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${className} relative text-start`} ref={ref}>
            <input
                type="text"
                placeholder={t("placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full p-2 rounded-lg shadow-sm focus:outline-none bg-gray-100 focus:bg-gray-200"
                disabled={disabled}
            />
            <button onClick={handleReset} className="absolute hover:cursor-pointer hover:bg-gray-300 top-0 right-0 p-2 rounded-lg">
                <IoClose size={22}/>
            </button>
            {isFocused && query.length > 1 && !disabled && <ul className="absolute w-full mt-2 rounded-lg shadow-lg divide-y divide-gray-300 bg-gray-200 z-20">
                {filteredData.map((item) => (
                    <li 
                        key={item.id} 
                        className="p-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg" 
                        onClick={() => handleClick(item)}
                    >
                        {item.value}
                    </li>
                ))}
            </ul>}
        </div>
    );
}