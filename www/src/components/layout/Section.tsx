import { ColorVariant, sectionClasses } from "@/lib/constants/colors";

export default function Section({
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
        <section
            className={`flex justify-between pt-6 pb-6 px-6 sm:px-16 gap-y-6 ${colorClass} ${className}`}
        >
            {children}
        </section>
    );
}