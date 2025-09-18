import { ChangeEventHandler } from "react"

export default function Radio({ 
    groupName,
    value, 
    onChange, 
    checked,
    label
}: Readonly<{
    groupName: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    checked: boolean,
    label?: string
}>) {
    return(
        <div className="flex items-center">
            <div className="relative h-5">
                <input 
                    type="radio" 
                    name={groupName}
                    id={value} 
                    value={value}
                    onChange={onChange}
                    checked={checked}
                    className="appearance-none w-5 h-5 border-1 border-secondary-950 rounded-full "
                />
                <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-primary-500 duration-200 ${checked ? "scale-100" : "scale-0"}`}></div>
            </div>
            <label htmlFor={value}>{label}</label>
        </div>
    )
}