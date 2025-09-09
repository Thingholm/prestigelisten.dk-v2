export type ColorVariant = "primary" | "secondary" | "gray" | "default";

export const sectionClasses: Record<ColorVariant, string> = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-950 text-white",
    gray: "bg-gray-200",
    default: "bg-white",
};

export const raceClassColors: Record<number, string> = {
    // Tour de France
    1: "#fee402",
    // Grand Tour
    2: "#820045",
    // Grand Tour B
    26: "#9c080f",
    // Monument
    3: "#a30707",
    // WTT A
    4: "#0b29b0",
    // WTC A
    5: "#088a15",
    // WTT B
    6: "#2950ff",
    // WTC B
    7: "#0ecc21",
    // WTT C
    8: "#299bff",
    // WTC C
    9: "#45ff42",
    // WTT D
    10: "#29fbff",
    // WTC D
    11: "#8bff87",
}