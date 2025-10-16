import Section from "@/components/layout/Section";
import { Nation } from "@/db/nations";
import RemoveCompareableEntityButton from "../../_components/RemoveCompareableEntityButton";
import FlagSpan from "@/components/table/FlagSpan";
import { getTranslations } from "next-intl/server";

export default async function CompareProfileSection({
    nation1,
    nation2,
    nationIds
}: Readonly<{
    nation1: Nation | null,
    nation2: Nation | null,
    nationIds: number[]
}>) {
    const tNations = await getTranslations("nations")

    return (
        <Section className="justify-around sm:justify-start !pb-0 !pt-0">
            <div className="w-1/3 flex-col flex items-start md:items-end text-end">
                {nation1 &&
                    <div key={nation1.id} className="flex flex-col items-end">
                        <RemoveCompareableEntityButton 
                            id={nation1.id} 
                            ids={nationIds}
                            param="nations"
                        />
                        <FlagSpan code={nation1.code} className="!w-32 sm:!w-36 md:!w-50 aspect-[4/3] !rounded-2xl"/>
                        <h2 className="text-3xl font-bold mb-2  mt-4">{tNations(`${nation1.code}.name`) ?? ""}</h2>
                    </div>
                }
            </div>
            <div className="w-1/3"></div>
            <div className="w-1/3 flex-col flex items-end md:items-start">
                {nation2 &&
                    <div key={nation2.id}>
                        <RemoveCompareableEntityButton 
                            id={nation2.id} 
                            ids={nationIds}
                            param="nations"
                        />                        
                        <FlagSpan code={nation2.code} className="!w-32 sm:!w-36 md:!w-50 aspect-[4/3] !rounded-2xl"/>
                        <h2 className="text-3xl font-bold mb-2 mt-4">{tNations(`${nation2.code}.name`) ?? ""}</h2>
                    </div>
                }
            </div>
        </Section>
    )
}