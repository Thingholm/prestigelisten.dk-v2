import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import HeroSection from "./HeroSection";
import ActiveAndDanishRidersSection from "./ActiveAndDanishRidersSection";
import { getAllNationPointsWithRiderCount } from "@/db/nationPoints";
import NationsSection from "./NationsSection";

export default async function HomePage() {
    const riderPointsWithNationsAndTeams = await getAllRiderPointsWithNationAndTeam();
    const nationPointsWithRiderCount = await getAllNationPointsWithRiderCount();

    return (
        <div>
            <HeroSection riderPointsWithNationsAndTeams={riderPointsWithNationsAndTeams}/>
            <ActiveAndDanishRidersSection riderPointsWithNationAndTeam={riderPointsWithNationsAndTeams} />
            <NationsSection nationPointsWithRiderCount={nationPointsWithRiderCount} />
        </div>
    );
}