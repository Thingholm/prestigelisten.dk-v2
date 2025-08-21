import { ReactElement } from "react";

export default function Table({
    children,
    className = "",
}: Readonly<{
    children: ReactElement<React.ComponentProps<"thead"> | React.ComponentProps<"tbody">>[] | ReactElement<React.ComponentProps<"thead"> | React.ComponentProps<"tbody">>;
    className?: string;
}>) {
    return (
        <div className={`max-h-fit w-full text-shadow-secondary-950 ${className}`}>
            <table className={`w-full relative text-left bg-white`}>
                {children}
            </table>
        </div>
    );
}