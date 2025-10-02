export default function NationFlag({
    nation
}: Readonly<{
    nation: { code: string }
}>) {
    return (
        <div className={`fi fi-${nation.code} !w-56 h-[10.5rem] rounded-2xl mb-4 shadow-md aspect-4/3`}>
        </div>
    )
}