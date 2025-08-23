import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";

export default function SecondaryCellSpan({ 
    children, 
    className = "",
    breakpoint,
    inlineBreakpoint,
}: { 
    children: React.ReactNode; 
    className?: string; 
    breakpoint?: ScreenBreakpoint;
    inlineBreakpoint?: ScreenBreakpoint | "always";
}) {
    return (
        <span className={`text-sm opacity-40 ${inlineBreakpoint == "always" ? `inline pl-1.5` : `block ${inlineBreakpoint}:inline ${inlineBreakpoint}:pl-1.5`} ${breakpoint}:hidden ${className}`}>
            {children}
        </span>
    );
}