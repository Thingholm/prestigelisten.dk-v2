    "use client";

import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Section from "./layout/Section";
import Container from "./layout/Container";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { useTranslations } from "next-intl";

export default function NavigatorSection<T extends string | number>({
    options,
    selectedOption,
    setSelectedOption,
    title,
    children
}: Readonly<{
    options: T[],
    selectedOption: T,
    setSelectedOption: React.Dispatch<React.SetStateAction<T>>,
    title: string,
    children: React.ReactNode
}>) {
    const t = useTranslations("navigationButtons");

    const currentIndex = options.findIndex((opt) => opt === selectedOption);

    const handlePrev = () => {
        if (currentIndex < options.length - 1) {
            setSelectedOption(options[currentIndex + 1]);
        }
    };

    const handleNext = () => {
        if (currentIndex > 0) {
            setSelectedOption(options[currentIndex - 1]);
        }
    };

    return (
        <Section>
            <Container title={title}>
                <div className="text-center">
                    <Select
                        value={selectedOption}
                        onChange={(e) => {
                            const value = options.find(option => option.toString() == e.target.value);
                            if (value) setSelectedOption(value);
                        }}
                        className="mb-4 px-2 py-0.5 font-semibold text-lg"
                    >
                        {options.map(option => (
                            <option value={option} key={option}>{option}</option>
                        ))}
                    </Select>
                </div>

                 <div className="flex justify-center md:justify-between">
                    <button 
                        className={`hidden md:inline-block md:px-12 rounded-md cursor-pointer duration-150  ${currentIndex >= options.length - 1 ? "opacity-50" : "hover:bg-zinc-300"}`}
                        onClick={handlePrev}
                        disabled={currentIndex >= options.length - 1}
                    >
                        <IoChevronBack size={28} />
                    </button>

                    <div>
                        {children}
                    </div>

                    <button 
                        className={`hidden md:inline-block md:px-12 rounded-md cursor-pointer duration-150  ${currentIndex <= 0 ? "opacity-50" : "hover:bg-zinc-300"}`}
                        onClick={handleNext}
                        disabled={currentIndex <= 0}
                    >
                        <IoChevronForward size={28} />
                    </button>
                </div>
                <div className="flex gap-4 mt-4 md:hidden">
                    <Button 
                        color="gray" 
                        onClick={handlePrev}
                        disabled={currentIndex >= options.length - 1}
                        className="w-1/2"
                    >
                        &lt; {t("prev")}
                    </Button>
                    <Button 
                        color="gray" 
                        onClick={handleNext}
                        disabled={currentIndex <= 0}
                        className="w-1/2"
                    >
                        {t("next")} &gt;
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
