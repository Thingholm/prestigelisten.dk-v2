export default async function Skeleton({
    className,
    isDark = false
}: Readonly<{
    className?: string,
    isDark?: boolean
}>) {
    return (
        <div className={`${className} ${isDark ? "bg-neutral-700" : "bg-gray-200"}  animate-pulse rounded-md`}></div>
    )
}