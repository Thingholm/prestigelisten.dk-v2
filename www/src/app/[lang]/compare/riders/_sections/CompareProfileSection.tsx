import { Rider } from "@/db/rider";
import RemoveCompareableEntityButton from "../../_components/RemoveCompareableEntityButton";
import RiderImage from "@/components/entityPage/RiderImage";
import { getRiderName } from "@/lib/helpers/riderName";
import Section from "@/components/layout/Section";

export default function CompareProfileSection({
    rider1,
    rider2,
    riderIds
}: Readonly<{
    rider1: Rider | null,
    rider2: Rider | null,
    riderIds: number[]
}>) {
    return (
        <Section className="justify-around sm:justify-start !pb-0 !pt-0">
            <div className="w-1/3 flex-col flex items-start md:items-end text-end">
                {rider1 &&
                    <div key={rider1.id} className="flex flex-col items-end">
                        <RemoveCompareableEntityButton id={rider1.id} ids={riderIds}/>
                        <RiderImage rider={rider1} className="w-32 sm:w-36 md:w-auto"/>
                        <h2 className="text-2xl font-bold mb-2">{getRiderName(rider1) ?? ""}</h2>
                    </div>
                }
            </div>
            <div className="w-1/3"></div>
            <div className="w-1/3 flex-col flex items-end md:items-start">
                {rider2 &&
                    <div key={rider2.id}>
                        <RemoveCompareableEntityButton id={rider2.id} ids={riderIds}/>
                        <RiderImage rider={rider2} className="w-32 sm:w-36 md:w-auto"/>
                        <h2 className="text-2xl font-bold mb-2">{getRiderName(rider2) ?? ""}</h2>
                    </div>
                }
            </div>
        </Section>
    )
}