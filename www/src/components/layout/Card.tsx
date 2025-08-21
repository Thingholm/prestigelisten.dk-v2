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
            className={`flex justify-between px-6 py-4 rounded-xl ${colorClass} ${className}`}
        >
            {children}
        </div>
    );
}