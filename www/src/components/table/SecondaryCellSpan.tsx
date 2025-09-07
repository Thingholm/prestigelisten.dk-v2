import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";

export default function SecondaryCellSpan({ 
    children, 
    className = "",
    breakpoint,
    inlineBreakpoint,
    isColumn = false
}: { 
    children: React.ReactNode; 
    className?: string; 
    breakpoint?: ScreenBreakpoint;
    inlineBreakpoint?: ScreenBreakpoint | "always";
    isColumn?: boolean;
}) {
    return (
        <span className={`text-sm opacity-50 ${inlineBreakpoint == "always" ? `inline pl-1.5` : `block ${inlineBreakpoint}:inline ${inlineBreakpoint}:pl-1.5`} ${breakpoint}:hidden ${className} ${isColumn ? "font-normal!" : ""}`}>
            {children}
        </span>
    );
}