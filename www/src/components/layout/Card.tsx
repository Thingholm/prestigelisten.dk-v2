import { ColorVariant, sectionClasses } from "@/lib/constants/colors";

export default function Card({
    children,
    className = "",
    color = "default",
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    color?: ColorVariant;
}>) {
    const colorClass = sectionClasses[color];

    return (
        <div
            className={`flex justify-between px-4 sm:px-6 py-4 rounded-xl text-secondary-950 ${colorClass} ${className}`}
        >
            {children}
        </div>
    );
}