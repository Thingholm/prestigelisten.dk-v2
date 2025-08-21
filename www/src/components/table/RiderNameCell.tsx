import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import TableCell from "./TableCell";
import FlagSpan from "./FlagSpan";
import { getRiderUrl } from "@/lib/helpers/urls";

type Rider = {
    id: number,
    first_name: string | null;
    last_name: string;
    nations?: {
        code: string;
    }
}

export default function RiderNameCell({
    rider,
    className = "",
    showFlagBreakpoint,
    isLink = true,
}: Readonly<{
    rider: Rider;
    className?: string;
    showFlagBreakpoint?: ScreenBreakpoint | "always";
    isCell?: boolean;
    isLink?: boolean;
}>) {
    const flagSpanVariants = {
        sm: "sm:!hidden",
        md: "md:!hidden",
        lg: "lg:!hidden",
        xl: "xl:!hidden",
        "2xl": "2xl:!hidden",
        always: "",
    };

    return (
        <TableCell className={`${className}`} href={isLink ? getRiderUrl(rider) : undefined}>
            <FlagSpan code={rider.nations?.code} className={`${showFlagBreakpoint ? `${flagSpanVariants[showFlagBreakpoint]}` : "!hidden"}`}/>
            <span className="font-semibold">{rider.last_name.toUpperCase()}</span>
            {rider.first_name && 
                <span> {rider.first_name}</span>
            }
        </TableCell>
    );
}