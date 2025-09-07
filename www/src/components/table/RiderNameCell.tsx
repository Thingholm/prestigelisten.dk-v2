import { ScreenBreakpoint } from "@/lib/constants/screenBreakpoints";
import TableCell, { SecondarySpanProps } from "./TableCell";
import FlagSpan from "./FlagSpan";
import { getRiderUrl } from "@/lib/helpers/urls";
import MovementIcon from "../ui/MovementIcon";

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
    isCell = true,
    isLink = true,
    secondarySpan,
    movement
}: Readonly<{
    rider: Rider;
    className?: string;
    showFlagBreakpoint?: ScreenBreakpoint | "always";
    isCell?: boolean;
    isLink?: boolean;
    secondarySpan?: SecondarySpanProps;
    movement?: "up" | "none" | "down"
}>) {
    const flagSpanVariants = {
        sm: "sm:!hidden",
        md: "md:!hidden",
        lg: "lg:!hidden",
        xl: "xl:!hidden",
        "2xl": "2xl:!hidden",
        always: "",
    };

    const content = () => (
        <>
            <FlagSpan code={rider.nations?.code} className={`${showFlagBreakpoint ? `${flagSpanVariants[showFlagBreakpoint]}` : "!hidden"}`}/>
            <span className="font-semibold">{rider.last_name.toUpperCase()}</span>
            {rider.first_name && 
                <span> {rider.first_name}</span>
            }
            {movement &&
                <MovementIcon movement={movement} />
            }
        </>
    )

    if (isCell) {
        return (
            <TableCell 
                className={`${className}`} 
                href={isLink ? getRiderUrl(rider) : undefined}
                secondarySpan={secondarySpan}
            >
                {content()}
            </TableCell>
        );
    }

    return content();

}