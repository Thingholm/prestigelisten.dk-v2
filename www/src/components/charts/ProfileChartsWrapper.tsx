"use client";

import { ReactElement, useState } from "react";
import ResultCategoryDistribution from "./ResultCategoryDistribution";
import YearlyAlltimeRankingsChart from "./YearlyAlltimeRankingsChart";
import YearlyPointsChart from "./YearlyPointsChart";
import YearlyRankingsChart from "./YearlyRankingsChart";
import YearlyResultCategoryDistributionChart from "./YearlyResultCategoryDistributionChart";

export default function ProfileChartsWrapper({
    charts,
    initialChartIndex
}: Readonly<{
    charts: { 
        title: string,
        component: ReactElement<typeof ResultCategoryDistribution | typeof YearlyAlltimeRankingsChart | typeof YearlyPointsChart | typeof YearlyRankingsChart | typeof YearlyResultCategoryDistributionChart>
    }[],
    initialChartIndex: number
}>) {
    const [currentChartIndex, setCurrentChartIndex] = useState(initialChartIndex);

    return(
        <div className="w-full flex flex-col items-center">
            <select 
                className="bg-secondary-900 mb-4 text-lg rounded-md px-1 py-0.5"
                value={currentChartIndex} 
                onChange={e => setCurrentChartIndex(parseInt(e.target.value))}
            >
                {
                    charts.map((_, index) => {
                        return (
                            <option value={index} key={`${initialChartIndex}-${index}`}>
                                {charts[index].title}
                            </option>
                        )
                    })
                }
            </select>
            {charts[currentChartIndex].component}
        </div>
    )
}