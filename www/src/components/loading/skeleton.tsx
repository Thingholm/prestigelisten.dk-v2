export default async function Skeleton({
    className,
    isDark = false,
    isPrimary = false,
}: Readonly<{
    className?: string,
    isDark?: boolean,
    isPrimary?: boolean
}>) {
    return (
        <div className={`${className} ${isDark ? "bg-neutral-700" : isPrimary ? "bg-primary-600" : "bg-gray-200"}  animate-pulse rounded-md`}></div>
    )
}