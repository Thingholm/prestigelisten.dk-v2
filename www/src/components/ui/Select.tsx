import { ChangeEventHandler } from "react";

export default function Select<T extends string | number>({
    value,
    onChange,
    disabled = false,
    className,
    children,
    name
}: Readonly<{
    value: T
    onChange: ChangeEventHandler<HTMLSelectElement>
    disabled?: boolean
    className?: string
    children: React.ReactNode
    name?: string
}>) {
    return (
        <select
            value={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            className={`border border-secondary-950 rounded-md px-1 ${className}`}
        >
            {children}
        </select>
    )
}