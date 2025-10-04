export default function ChartTooltip({
    children,
    className
}: Readonly<{
    children: React.ReactNode,
    className?: string
}>) {
    return(
        <div className={`${className} bg-neutral-950 bg-opacity-95 px-10 py-4 rounded-xl text-start`}>
            {children}
        </div>
    );
}