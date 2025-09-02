import { ColorVariant } from "@/lib/constants/colors";
import Button, { ButtonVariant } from "../ui/Button";
import TableCell from "./TableCell";
import { IoChevronDown } from "react-icons/io5";

export default function ExpandCell({
    variant = "text",
    color = "secondary",
    isExpanded,
    setIsExpanded
}: Readonly<{
    variant?: ButtonVariant,
    color?: ColorVariant,
    isExpanded: boolean,
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}>) {
    return (
        <TableCell className="w-8 sm:w-12">
            <Button 
                variant={variant} 
                color={color} 
                onClick={() => setIsExpanded(s => s ? false : true)}
                className="!py-1 px-2! sm:px-4"
            >
                <IoChevronDown className={`duration-150 ${isExpanded ? "rotate-180" : ""}`}/>
            </Button>
        </TableCell>
    )
}