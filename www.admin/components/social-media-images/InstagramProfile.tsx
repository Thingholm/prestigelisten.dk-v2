import { Settings } from "./ContentWrapper";
import FlagSpan from "./table/FlagSpan";
import { Rider } from "@/lib/db/riders";
import RiderImage from "./RiderImage";
import { useT } from "@/lib/helpers/translations";

export default function InstagramProfile({
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
        <div className={`p-4 font-medium flex gap-4 ${settings.whiteText ? "text-white" : ""}`} style={{ backgroundColor: settings.colorHex }}>
            <RiderImage 
                rider={{...rider, images: null}} 
                size={250}
                className="w-fit"
            />
            <div className="flex w-fit flex-col justify-between">
                <div className="flex justify-between items-center text-lg">
                    <p>
                        <FlagSpan code={rider.nations?.code} /> 
                        {tNations(`${rider.nations.code}.name`)}
                    </p>
                    <p>{rider.year ?? ""}</p>
                </div>
                <p 
                    className={`font-bold text-wrap`} 
                    style={{ 
                        fontSize: `${settings.textSize * 1.25}px`, 
                        lineHeight: `${settings.textSize * 1.2}px` 
                    }}
                >
                        {rider.first_name?.toUpperCase()} {rider.last_name?.toUpperCase()}
                </p>
                <p className="font-medium text-wrap text-lg">{rider.teams?.name ?? ""}</p>
            </div>  
        </div>
    )
}