import { getAllResultsFromYear } from "@/db/results";
import { getMinRiderBirthYear } from "@/db/rider";
import { getAllRiderSeasonsFromYear } from "@/db/seasons";
import SelectYearSection from "./SelectYearSection";
import MostPointsInYearSection from "./MostPointsInYearSection";
import { getPointSystem } from "@/db/pointSystem";

export default async function YearPage({
    params
}: Readonly<{
    params: Promise<{ year: number }>
}>) {
    const year = (await params).year;
    const maxYear = new Date().getFullYear();

    const minYear = (await getMinRiderBirthYear()).min;
    const resultsFromYear = await getAllResultsFromYear(year);
    const riderSeasonsFromYear = await getAllRiderSeasonsFromYear(year);
    const pointSystem = await getPointSystem();


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
                pointSystem={pointSystem}
            />
        </div>
    )
}