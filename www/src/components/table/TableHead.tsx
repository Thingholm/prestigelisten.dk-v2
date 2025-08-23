import { ReactElement } from "react";

export default function TableHead({
    children,
    className = "",
}: Readonly<{
    children: ReactElement<React.ComponentProps<"th">> | ReactElement<React.ComponentProps<"th">>[];
    className?: string;
}>) {
    return (
        <thead className={`top-0 left-0 bg-white header-border-bottom z-10 ${className}`}>
            <tr>{children}</tr>
        </thead>
    );
}