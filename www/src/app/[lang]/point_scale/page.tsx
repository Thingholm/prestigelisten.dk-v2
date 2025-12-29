import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces } from "@/db/race";
import { getRaceClasses } from "@/db/raceClasses";
import { getTranslations } from "next-intl/server";
import RaceClassAccordion from "./_components/RaceClassAccordion";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.pointScale'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}
export default async function PointSystemPage() {
    const t = await getTranslations("pointSystems");

    const [
        pointSystem,
        races,
        raceClasses
    ] = await Promise.all([
        getPointSystem(),
        getRaces(),
        getRaceClasses()
    ]);

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