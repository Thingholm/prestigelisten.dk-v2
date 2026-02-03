import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getMaxRiderAge, getMinRiderAge, getRiderPointsByAge } from "@/db/riderPointsByAge";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SelectAgeSection from "./_sections/SelectAgeSection";
import { rankBy } from "@/lib/helpers/rank";
import RiderPointsByAgeTable from "./_tables/RiderPointsByAgeTable";

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'da' }
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da",  age: number }> }) {
    const { locale, age } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.ageRanking'});
    
    return {
        title: t('title', {age: age}),
        description: t("description", {age: age})
    };
}

export default async function AgePage({
    params
}: Readonly<{
    params: Promise<{ age: number, locale: "en" | "da"}>
}>) {
    const { locale, age } = await params;    
    setRequestLocale(locale);

    const t = await getTranslations("lists.riderAge");

    const [
        riderPointsByAge,
        minRiderAge,
        maxRiderAge
    ] = await Promise.all([
        getRiderPointsByAge(age)(),
        getMinRiderAge(),
        getMaxRiderAge()
    ]);
    
    const rankedRiderPoints = rankBy(riderPointsByAge, "points");

    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("ageTitle")}</PageHeading>
            </Section>
            <SelectAgeSection
                selectedAge={age}
                minAge={minRiderAge}
                maxAge={maxRiderAge}
            />
            <Section>
                <RiderPointsByAgeTable riderPointsByAge={rankedRiderPoints}/>
            </Section>
        </div>
    )
}