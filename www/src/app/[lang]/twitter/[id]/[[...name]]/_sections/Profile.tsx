import { Rider } from "@/db/rider";
import { Settings } from "./ContentWrapper";
import RiderImage from "@/components/entityPage/RiderImage";
import { useTranslations } from "use-intl";
import FlagSpan from "@/components/table/FlagSpan";

export default function Profile({
    rider,
    settings,
}: Readonly<{
    rider: Rider,
    settings: Settings
}>) {
    const tNations = useTranslations("nations");

    return (
        <div className={`p-4 w-[232px] h-full font-medium ${settings.whiteText ? "text-white" : ""}`} style={{ backgroundColor: settings.colorHex }}>
            <RiderImage rider={{...rider, images: null}} className="mb-2"/>
            <div className="flex flex-col justify-between h-[160px]">
                <div className="flex justify-between items-center">
                    <p>
                        <FlagSpan code={rider.nations?.code} /> 
                        {tNations(`${rider.nations.code}.name`)}
                    </p>
                    <p>{rider.year ?? ""}</p>
                </div>
                <p 
                    className={`font-bold text-wrap`} 
                    style={{ 
                        fontSize: `${settings.textSize}px`, 
                        lineHeight: `${settings.textSize * 1.2}px` 
                    }}
                >
                        {rider.first_name?.toUpperCase()} {rider.last_name?.toUpperCase()}
                </p>
                <p className="font-medium text-wrap">{rider.teams?.name ?? ""}</p>
            </div>  
        </div>
    )
}