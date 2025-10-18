import { ChangeEventHandler, useId } from "react";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({
    label,
    onChange,
    isChecked,
    isDisabled
}: Readonly<{
    label: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    isChecked: boolean,
    isDisabled?: boolean
}>) {
    const id = useId();

    return (
        <div className="flex items-center">
            <label className={`inline-flex items-center justify-center relative h-4 ${isChecked ? "bg-primary-500" : ""} rounded-sm ${isDisabled ? "opacity-50" : ""}`} htmlFor={id}>
                <input 
                    type="checkbox" 
                    name={id} 
                    id={id}
                    onChange={onChange}
                    checked={isChecked}
                    className={`appearance-none w-4 h-4 border-1 border-secondary-950 rounded-sm z-10 ${isDisabled ? "opacity-50" : ""}`}
                    disabled={isDisabled}
                />
                <div className={`absolute w-4 h-4 top-0 left-0 z-0 duration-100 ${isChecked ? "scale-100" : "scale-0"}`}>
                    <FaCheck size={12} className="absolute top-0.5 left-0.5"/>
                </div>
            </label>
            <label htmlFor={id} className={`select-none pl-2 ${isDisabled ? "opacity-50" : ""}`}>{label}</label>
        </div>
    )
}