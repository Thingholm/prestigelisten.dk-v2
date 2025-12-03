import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces } from "@/db/race";
import { getRaceClasses } from "@/db/raceClasses";
import { getTranslations } from "next-intl/server";
import RaceClassAccordion from "./_components/RaceClassAccordion";

export default async function PointSystemPage() {
    const t = await getTranslations("pointSystems");

    const pointSystem = await getPointSystem();
    const races = await getRaces();
    const raceClasses = await getRaceClasses();

    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <Section className="flex-col">
                {raceClasses
                    .sort((a, b) => a.sorting_index - b.sorting_index)
                    .map(raceClass => (
                        <RaceClassAccordion 
                            key={raceClass.id}
                            raceClass={raceClass}
                            pointSystem={pointSystem}
                            races={races}
                        />
                    ))
                }
            </Section>
        </div>
    )
}