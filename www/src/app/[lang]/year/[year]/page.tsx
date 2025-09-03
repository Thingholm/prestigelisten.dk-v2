import { getAllResultsFromYear } from "@/db/results";
import { getMinRiderBirthYear } from "@/db/rider";
import { getAllNationSeasonsFromYear, getAllRiderSeasonsFromYear } from "@/db/seasons";
import SelectYearSection from "./_sections/SelectYearSection";
import MostPointsInYearSection from "./_sections/MostPointsInYearSection";
import { getPointSystem } from "@/db/pointSystem";
import AlltimePointsForYearSection from "./_sections/AlltimePointsForYearSection";
import { getRidersFromYear } from "@/db/riderPoints";
import GreatestRidersBornInYearSection from "./_sections/GreatestRidersBornInYearSection";
import ResultsFromYearSection from "./_sections/ResultsFromYearSection";

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
    const nationSeasonsFromYear = await getAllNationSeasonsFromYear(year);
    const ridersFromYear = await getRidersFromYear(year);

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