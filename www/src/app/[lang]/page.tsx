import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import HeroSection from "./HeroSection";
import ActiveAndDanishRidersSection from "./ActiveAndDanishRidersSection";
import { getAllNationPointsWithRiderCount } from "@/db/nationPoints";
import NationsSection from "./NationsSection";
import { getGreatestSeasons, getTop10AlltimeEachSeason } from "@/db/seasons";
import { getPointSystem } from "@/db/pointSystem";
import GreatestSeasonsSection from "./GreatestSeasonsSection";
import TopAlltimeEachSeasonSection from "./TopAlltimeEachSeasonSection";

export default async function HomePage() {
    const riderPointsWithNationsAndTeams = await getAllRiderPointsWithNationAndTeam();
    const nationPointsWithRiderCount = await getAllNationPointsWithRiderCount();
    const greatestSeasons = await getGreatestSeasons();
    const pointSystem = await getPointSystem();
    const top10AlltimeEachSeason = await getTop10AlltimeEachSeason();

    return (
        <div>
            <HeroSection riderPointsWithNationsAndTeams={riderPointsWithNationsAndTeams}/>
            <ActiveAndDanishRidersSection riderPointsWithNationAndTeam={riderPointsWithNationsAndTeams} />
            <NationsSection nationPointsWithRiderCount={nationPointsWithRiderCount} />
            <GreatestSeasonsSection greatestSeasons={greatestSeasons} pointSystem={pointSystem} />
            <TopAlltimeEachSeasonSection top10AlltimeEachSeason={top10AlltimeEachSeason} />
        </div>
    );
}