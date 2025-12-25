import { getNation, getNationsWithTopRidersAndCount } from "@/db/nations";
import { getPointSystem } from "@/db/pointSystem";
import NationSearchSection from "./_sections/NationSearchSection";
import CompareProfileSection from "./_sections/CompareProfileSection";
import ComparePropertiesSection from "./_sections/ComparePropertiesSection";
import { rankBy } from "@/lib/helpers/rank";
import { getRaces } from "@/db/race";
import CompareGreatestResultsSection from "./_sections/CompareGreatestResultsSection";
import CompareChartSection from "./_sections/CompareChartSection";

export default async function Page({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ nations: string }>;
}>) {
    const nationIdParams = (await searchParams).nations ?? ""
    const nationIds = nationIdParams.split(",").map(nationId => parseInt(nationId)).filter(nationId => !Number.isNaN(nationId)).slice(0, 2);

    const nationsPoints = await getNationsWithTopRidersAndCount();
    const pointSystem = await getPointSystem();
    const races = await getRaces();

    const nation1 = nationIds[0] ? await getNation(nationIds[0])() : null;
    const nation2 = nationIds[1] ? await getNation(nationIds[1])() : null;

    if (nation1) {
        nation1.riders = nation1.riders.map(rider => ({
            ...rider,
            results: rider.results.map(result => ({
                ...result,
                races: races.find(race => race.id == result.race_id)
            }))
        }))
    }

    if (nation2) {
        nation2.riders = nation2.riders.map(rider => ({
            ...rider,
            results: rider.results.map(result => ({
                ...result,
                races: races.find(race => race.id == result.race_id)
            }))
        }))
    }

    return (
        <div>
            <NationSearchSection nations={nationsPoints} nationIds={nationIds}/>
            <CompareProfileSection
                nation1={nation1}
                nation2={nation2}
                nationIds={nationIds}
            />
            <ComparePropertiesSection
                nation1={nation1}
                nation2={nation2}
                nations={rankBy(nationsPoints, "points")}
                pointSystem={pointSystem}
            />
            <CompareGreatestResultsSection
                nation1={nation1}
                nation2={nation2}
                pointSystem={pointSystem}
            />
            {nation1 && nation2 &&
                <CompareChartSection
                    nation1={nation1}
                    nation2={nation2}
                />
            }
        </div>
    )
}