import { getAllResultsFromYear } from "@/db/results";
import { getMinRiderBirthYear, getRidersFromYear } from "@/db/rider";
import { getAllNationSeasonsFromYear, getAllRiderSeasonsFromYear } from "@/db/seasons";
import SelectYearSection from "./_sections/SelectYearSection";
import MostPointsInYearSection from "./_sections/MostPointsInYearSection";
import { getPointSystem } from "@/db/pointSystem";
import AlltimePointsForYearSection from "./_sections/AlltimePointsForYearSection";
import GreatestRidersBornInYearSection from "./_sections/GreatestRidersBornInYearSection";
import ResultsFromYearSection from "./_sections/ResultsFromYearSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da",  year: number }> }) {
    const { locale, year } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.seasonOverview'});
    
    return {
        title: t('title', {year: year}),
        description: t("description", {year: year})
    };
}

export default async function YearPage({
    params
}: Readonly<{
    params: Promise<{ year: number }>
}>) {
    const year = (await params).year;
    const maxYear = new Date().getFullYear();

    const minYear = (await getMinRiderBirthYear()).min;

    const [
        resultsFromYear,
        riderSeasonsFromYear,
        nationSeasonsFromYear,
        ridersFromYear,
        pointSystem
    ] = await Promise.all([
        getAllResultsFromYear(year)(),
        getAllRiderSeasonsFromYear(year)(),
        getAllNationSeasonsFromYear(year)(),
        getRidersFromYear(year)(),
        getPointSystem()
    ])


    return (
        <div>
            <SelectYearSection
                curYear={year}
                minYear={minYear}
                maxYear={maxYear}
            />
            <MostPointsInYearSection 
                year={year}
                resultsFromYear={resultsFromYear} 
                riderSeasonsFromYear={riderSeasonsFromYear}
                nationSeasonsFromYear={nationSeasonsFromYear}
                pointSystem={pointSystem}
            />
            <AlltimePointsForYearSection 
                year={year}
                riderSeasonsFromYear={riderSeasonsFromYear}
                nationSeasonsFromYear={nationSeasonsFromYear}
            />
            <GreatestRidersBornInYearSection ridersFromYear={ridersFromYear} year={year}/>
            {resultsFromYear.length > 0 &&
                <ResultsFromYearSection
                    year={year}
                    resultsFromYear={resultsFromYear}
                    pointSystem={pointSystem}
                />
            }
        </div>
    )
}