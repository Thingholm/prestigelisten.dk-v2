import { IoChevronDown } from "react-icons/io5";

export default function DropdownGroup({
    children,
    title,
    isOpen,
    setIsOpen
}: Readonly<{
    children: React.ReactNode,
    title: string,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}>) {
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div 
            className="relative group" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <p className="text-primary-500 flex items-center gap-x-1 select-none">
                <span>{title}</span> 
                <IoChevronDown className="group-hover:rotate-180 duration-300"/>
            </p>
            <div className={`h-10 absolute w-full ${isOpen ? 'block' : 'hidden'}`}></div>
            <div className={`${isOpen ? "block" : "hidden"} absolute w-max mt-6 left-1/2 transform -translate-x-1/2`}>
                <div className="grid bg-secondary-950 rounded-lg shadow-lg p-8 grid-cols-2 gap-y-6 gap-x-11">
                    {children}
                </div>
            </div>
        </div>
    )
}