import { getAllRiderPointsWithNationAndTeam } from "@/db/riderPoints";
import HeroSection from "./HeroSection";

export default async function HomePage() {
    const riderPointsWithNationsAndTeams = await getAllRiderPointsWithNationAndTeam();

    return (
        <div>
            <HeroSection riderPointsWithNationsAndTeams={riderPointsWithNationsAndTeams.slice(0, 20)}/>
        </div>
    );
}