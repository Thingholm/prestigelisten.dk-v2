export type ColorVariant = "primary" | "secondary" | "gray" | "default";

export const sectionClasses: Record<ColorVariant, string> = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-950 text-white",
    gray: "bg-gray-200",
    default: "bg-white",
};