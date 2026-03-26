import { Settings } from "./ContentWrapper";
import FlagSpan from "./table/FlagSpan";
import { Rider } from "@/lib/db/riders";
import RiderImage from "./RiderImage";
import { useT } from "@/lib/helpers/translations";

export default function Profile({
    rider,
    settings,
    locale
}: Readonly<{
    rider: Rider,
    settings: Settings,
    locale: "en" | "da"
}>) {
    const tNations = useT("nations", locale);

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