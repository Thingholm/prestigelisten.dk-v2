import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces } from "@/db/race";
import { getAllGreatestSeasons } from "@/db/seasons"
import { getTranslations } from "next-intl/server";
import GreatestSeasonsSection from "./_sections/GreatestSeasonsSection";
import { Tables } from "@/utils/supabase/database.types";
import { rankBy } from "@/lib/helpers/rank";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.greatestSeasons'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}
export type GreatestSeasonsWithResults = (Tables<"rider_seasons"> & {
    riders: Tables<"riders"> & {
        nations: Tables<"nations">
    },
    results: (Tables<"results"> & {
        races: Tables<"races"> & {
            meta_races: Tables<"meta_races">
        }
    })[]
})

export default async function GreatestSeasonsPage() {
    const t = await getTranslations("lists.greatestSeasons");

    const [
        greatestSeasons,
        races,
        pointSystem
    ] = await Promise.all([
        getAllGreatestSeasons(),
        getRaces(),
        getPointSystem()
    ]);

    const greatestSeasonsWithResultPoints = greatestSeasons.map(season => ({
        ...season,
        results: season.results.map(result => {
            const race = races.find(race => race.id === result.race_id);
            if (!race) throw new Error(`Race not found: ${result.race_id}`);
            return {
                ...result,
                races: race
            };
        })
    }));

    const greatestSeasonsRanked = rankBy(greatestSeasonsWithResultPoints, "points_for_year");
    
    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("title")}</PageHeading>
            </Section>
            <GreatestSeasonsSection greatestSeasons={greatestSeasonsRanked} pointSystem={pointSystem}/>
        </div>
    )
}