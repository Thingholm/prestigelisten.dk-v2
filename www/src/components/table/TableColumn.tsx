export default function TableColumn({
    children,
    className = "",
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
}>) {
    return (
        <th
            className={`${className} not-last:pr-1 `}
        >
            {children}
        </th>
    );
}