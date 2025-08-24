import { IoCaretDown, IoCaretUp } from "react-icons/io5";

type Movement = "up" | "none" | "down";

export default function MovementIcon({ movement }: { movement: Movement}) {
    
    return (
        <span className="pl-2">
            {movement == "up"
                && <IoCaretUp className="fill-green-600 inline"/>
            }
            {movement == "down"
                && <IoCaretDown className="fill-red-600 inline"/>
            }
        </span>
    )
}