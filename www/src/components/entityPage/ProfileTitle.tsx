export default function ProfileTitle({ 
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return(
        <h1 className="text-3xl font-bold mb-2">
            {children}
        </h1>
    )
}