import { getRider, getRiders } from "@/db/rider";
import RiderSearchSection from "./_sections/RiderSearchSection";
import Section from "@/components/layout/Section";
import ComparePropertiesSection from "./_sections/ComparePropertiesSection";
import { rankBy } from "@/lib/helpers/rank";
import { getPointSystem } from "@/db/pointSystem";
import CompareProfileSection from "./_sections/CompareProfileSection";
import CompareGreatestResultsSection from "./_sections/CompareGreatestResultsSection";
import CompareChartSection from "./_sections/CompareChartSection";

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ riders: string }>;
}>) {
    const riderIdParams = (await searchParams).riders ?? ""
    const riderIds = riderIdParams.split(",").map(riderId => parseInt(riderId)).filter(riderId => !Number.isNaN(riderId)).slice(0, 2);

    const riders = await getRiders();
    const rankedActiveRiders = rankBy(
        riders.filter(rider => rider.active).map(rider => ({
            ...rider, 
            points: rider.rider_points?.[0]?.points ?? 0
        })),
        "points"
    );

    const pointSystem = await getPointSystem();

    const rider1 = riderIds[0] ? await getRider(riderIds[0])() : null;
    const rider2 = riderIds[1] ? await getRider(riderIds[1])() : null;

    return (
        <div>
            <RiderSearchSection riders={riders} riderIds={riderIds}/>
            <CompareProfileSection
                rider1={rider1}
                rider2={rider2}
                riderIds={riderIds}
            />
            <ComparePropertiesSection 
                rider1={rider1} 
                rider2={rider2}
                rankedActiveRiders={rankedActiveRiders}
                pointSystem={pointSystem}
            />
            <CompareGreatestResultsSection
                rider1={rider1} 
                rider2={rider2}
                pointSystem={pointSystem}
            />
            {rider1 && rider2 &&               
                <CompareChartSection
                    rider1={rider1}
                    rider2={rider2}
                />
            }
        </div>
    )
}