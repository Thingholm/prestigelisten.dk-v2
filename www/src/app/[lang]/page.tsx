import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import HeroSection from "./HeroSection";
import ActiveAndDanishRidersSection from "./_sections/ActiveAndDanishRidersSection";
import { getAllNationPointsWithRiderCount } from "@/db/nationPoints";
import NationsSection from "./_sections/NationsSection";
import { getGreatestSeasons, getTop10AlltimeEachSeason } from "@/db/seasons";
import { getPointSystem } from "@/db/pointSystem";
import GreatestSeasonsSection from "./_sections/GreatestSeasonsSection";
import TopAlltimeEachSeasonSection from "./_sections/TopAlltimeEachSeasonSection";
import { getRiders3YearRollingRankings } from "@/db/riders3YearRollingRankings";
import Riders3YearRollingRankingsSection from "./_sections/Riders3YearRollingRankingsSection";

export default async function HomePage() {
    const riderPointsWithNationsAndTeams = await getAllRiderPointsWithNationAndTeam();
    const nationPointsWithRiderCount = await getAllNationPointsWithRiderCount();
    const greatestSeasons = await getGreatestSeasons();
    const pointSystem = await getPointSystem();
    const top10AlltimeEachSeason = await getTop10AlltimeEachSeason();
    const riders3YearRollingRankings = await getRiders3YearRollingRankings();

    return (
        <div>
            <HeroSection riderPointsWithNationsAndTeams={riderPointsWithNationsAndTeams}/>
            <ActiveAndDanishRidersSection riderPointsWithNationAndTeam={riderPointsWithNationsAndTeams} />
            <NationsSection nationPointsWithRiderCount={nationPointsWithRiderCount} />
            <GreatestSeasonsSection greatestSeasons={greatestSeasons} pointSystem={pointSystem} />
            <TopAlltimeEachSeasonSection top10AlltimeEachSeason={top10AlltimeEachSeason} />
            <Riders3YearRollingRankingsSection riders3YearRollingRankings={riders3YearRollingRankings} />
        </div>
    );
}