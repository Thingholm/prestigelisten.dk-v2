import { getNationWithRiders } from "@/db/nations";
import { getPointSystem } from "@/db/pointSystem";
import { getRaces } from "@/db/race";
import ProfileSection from "./_sections/ProfileSection";
import { getNationPoints } from "@/db/nationPoints";
import { rankBy } from "@/lib/helpers/rank";
import { GetRidersWithPreviousNationality } from "@/db/prevNationalities";
import ChartsSection from "./_sections/ChartsSection";

export default async function NationPage({
    params,
}: Readonly<{
    params: Promise<{ id: number }>
}>) {
    const id = (await params).id;

    const nation = await getNationWithRiders(id);
    const races = await getRaces();
    const pointSystem = await getPointSystem();
    const nationPoints = await getNationPoints();
    const ridersWithPreviousNationality = await GetRidersWithPreviousNationality(id);

    nation.riders = [
        ...nation.riders,
        ...ridersWithPreviousNationality.map(riders => riders.riders)
    ]

    const rankedActiveNationPoints = rankBy(nationPoints, "active_points");

    return (
        <div>
            <ProfileSection 
                nation={nation} 
                rankedActiveNationPoints={rankedActiveNationPoints}
                races={races}
            />
            <ChartsSection 
                nation={nation} 
                races={races}
                pointSystem={pointSystem}
            />
        </div>
    )
}