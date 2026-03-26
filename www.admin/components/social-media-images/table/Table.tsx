import { ReactElement } from "react";

export default function Table({
    children,
    className = "",
    horisontal = false
}: Readonly<{
    children: ReactElement<React.ComponentProps<"thead"> | React.ComponentProps<"tbody">>[] | ReactElement<React.ComponentProps<"thead"> | React.ComponentProps<"tbody">>;
    className?: string;
    horisontal?: boolean;
}>) {
    return (
        <div className={`max-h-fit w-full text-shadow-secondary-950 ${horisontal ? "w-full overflow-x-scroll custom-scrollbar" : ""} ${className}`}>
            <table className={`w-full relative text-left bg-white`}>
                {children}
            </table>
        </div>
    );
}