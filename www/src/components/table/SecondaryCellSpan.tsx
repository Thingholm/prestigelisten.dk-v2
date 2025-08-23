import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";

export default function SecondaryCellSpan({ 
    children, 
    className = "",
    breakpoint,
}: { 
    children: React.ReactNode; 
    className?: string; 
    breakpoint: ScreenBreakpoint;
}) {
    return (
        <span className={`text-sm opacity-40 block ${breakpoint}:hidden ${className}`}>
            {children}
        </span>
    );
}