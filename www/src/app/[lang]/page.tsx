import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import HeroSection from "./HeroSection";
import ActiveAndDanishRidersSection from "./ActiveAndDanishRidersSection";

export default async function HomePage() {
    const riderPointsWithNationsAndTeams = await getAllRiderPointsWithNationAndTeam();

    return (
        <div>
            <HeroSection riderPointsWithNationsAndTeams={riderPointsWithNationsAndTeams}/>
            <ActiveAndDanishRidersSection riderPointsWithNationAndTeam={riderPointsWithNationsAndTeams} />
        </div>
    );
}