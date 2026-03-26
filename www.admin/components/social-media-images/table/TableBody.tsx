import { ReactElement } from "react";

export default function TableBody({
    children,
    className = "",
}: Readonly<{
    children?: ReactElement<React.ComponentProps<"tr">>[] | ReactElement<React.ComponentProps<"tr">>;
    className?: string;
}>) {
    return (
        <tbody className={`${className}`}>
            {children}
        </tbody>
    );
}