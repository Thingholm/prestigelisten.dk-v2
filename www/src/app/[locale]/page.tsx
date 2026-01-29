import HeroSection from "./HeroSection";
import ActiveAndDanishRidersSection from "./_sections/ActiveAndDanishRidersSection";
import { getGreatestSeasons, getTop10AlltimeEachSeason } from "@/db/seasons";
import { getPointSystem } from "@/db/pointSystem";
import GreatestSeasonsSection from "./_sections/GreatestSeasonsSection";
import TopAlltimeEachSeasonSection from "./_sections/TopAlltimeEachSeasonSection";
import { getRiders3YearRollingRankings } from "@/db/riders3YearRollingRankings";
import Riders3YearRollingRankingsSection from "./_sections/Riders3YearRollingRankingsSection";
import { getResultsThisYear } from "@/db/results";
import LatestResultsSection from "./_sections/LatestResultsSection";
import CalendarSection from "./_sections/CalendarSection";
import { getDecadeRankings } from "@/db/decade";
import DecadeSection from "./_sections/DecadeSection";
import SocialMediaSection from "./_sections/SocialMediaSection";
import { getAllRidersWithNationAndTeam } from "@/db/rider";
import { getNationsWithTopRidersAndCount } from "@/db/nations";
import NationsSection from "./_sections/NationsSection";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'da' }
    ];
}

export default async function HomePage({
    params
}: {
    params: Promise<{ locale: 'en' | 'da' }>
}) {
    const { locale } = await params;    
    setRequestLocale(locale);

    const [
        ridersWithNationAndTeam,
        nations,
        greatestSeasons,
        pointSystem,
        top10AlltimeEachSeason,
        riders3YearRollingRankings,
        results,
        decadeRankings,
    ] = await Promise.all([
        getAllRidersWithNationAndTeam(),
        getNationsWithTopRidersAndCount(),
        getGreatestSeasons(),
        getPointSystem(),
        getTop10AlltimeEachSeason(),
        getRiders3YearRollingRankings(),
        getResultsThisYear(),
        getDecadeRankings(),
    ])

    return (
        <div>
            <HeroSection ridersWithNationAndTeam={ridersWithNationAndTeam}/>
            <LatestResultsSection
                results={results}
                riders={ridersWithNationAndTeam}
                pointSystem={pointSystem}
            />
            <CalendarSection/>
            <ActiveAndDanishRidersSection ridersWithNationAndTeam={ridersWithNationAndTeam} />
            <NationsSection nationPointsWithRiderCount={nations} />
            <GreatestSeasonsSection greatestSeasons={greatestSeasons} pointSystem={pointSystem} />
            <TopAlltimeEachSeasonSection top10AlltimeEachSeason={top10AlltimeEachSeason} />
            <Riders3YearRollingRankingsSection riders3YearRollingRankings={riders3YearRollingRankings} />
            <DecadeSection decadeRankings={decadeRankings}/>
            <SocialMediaSection/>
        </div>
    );
}
