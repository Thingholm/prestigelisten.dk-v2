"use client";

import { ColorVariant } from "@/lib/constants/colors";

type ButtonAsLink = {
    href: string;
    target?: string;
    onClick?: never;
    disabled?: never;
}

type ButtonAsButton = {
    href?: never;
    target?: never;
    onClick: () => void;
    disabled?: boolean;
}

export type ButtonVariant = "solid" | "outline" | "text";

const variants: Record<ButtonVariant, Record<ColorVariant, string>> = {
    solid: {
        primary: "bg-primary-500 hover:bg-primary-600",
        secondary: "bg-secondary-950 text-white hover:bg-secondary-900",
        gray: "bg-gray-200 hover:bg-gray-300",
        default: "bg-white hover:bg-gray-100",
    },
    outline: {
        primary: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
        secondary: "border border-secondary-950 text-secondary-950 over:bg-secondary-950/10",
        gray: "border border-gray-200 text-gray-200 hover:bg-gray-50",
        default: "border border-white text-white over:bg-gray-100/10",
    },
    text: {
        primary: "text-primary-500 hover:bg-primary-50",
        secondary: "text-secondary-950 hover:bg-secondary-950/10",
        gray: "text-gray-200 hover:bg-gray-50",
        default: "text-white hover:bg-gray-100/10",
    },
};

export default function Button({
    children,
    onClick,
    href,
    target = "_self",
    disabled = false,
    fill = false,
    color = "primary",
    variant = "solid",
    className = "",
}: {
    children: React.ReactNode;
    fill?: boolean;
    color?: ColorVariant;
    variant?: ButtonVariant;
    className?: string;
} & (ButtonAsLink | ButtonAsButton)) {
    const variantClass = variants[variant][color];

    if (href) {
        return (
            <a
                href={href}
                target={target}
                onClick={onClick}
                className={`px-4 py-2 hover:cursor-pointer text-center select-none rounded-md ${fill ? "w-full" : ""} ${variantClass} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 hover:cursor-pointer rounded-md select-none ${fill ? "w-full" : ""} ${variantClass} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        >
        {   children}
        </button>
    );
}