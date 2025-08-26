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
        <TableCell className="w-12">
            <Button 
                variant="text" 
                color="secondary" 
                onClick={() => setIsExpanded(s => s ? false : true)}
                className="!py-1"
            >
                <IoChevronDown className={`duration-150 ${isExpanded ? "rotate-180" : ""}`}/>
            </Button>
        </TableCell>
    )
}