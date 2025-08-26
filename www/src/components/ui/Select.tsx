import { ChangeEventHandler } from "react";

export default function Select({
    value,
    onChange,
    disabled = false,
    className,
    children,
}: Readonly<{
    value: number
    onChange: ChangeEventHandler<HTMLSelectElement>
    disabled?: boolean
    className?: string
    children: React.ReactNode
}>) {
    return (
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`border border-secondary-950 rounded-md px-1 ${className}`}
        >
            {children}
        </select>
    )
}