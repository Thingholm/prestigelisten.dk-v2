export default function FlagSpan({
    code = "xx",
    className = "",
}: Readonly<{
    code: string | undefined;
    className?: string;
}>) {
    return (
        <span className={`fi fi-${code} mr-1 rounded-xs shadow-md ${className}`}></span>
    );
}