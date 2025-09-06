import PageHeading from "@/components/ui/PageHeading";
import { getTeamsWithRiders } from "@/db/team";
import TeamsTablesSection from "./_sections/TeamsTablesSection";
import { getTranslations } from "next-intl/server";
import Section from "@/components/layout/Section";

export default async function Page() {
    const t = await getTranslations("teamsPage");

    const teamsWithRiders = await getTeamsWithRiders();

    const teamsWithPoints = teamsWithRiders?.map(team => {
        const pointsForYear = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_for_year || 0);
        }, 0);

        const pointsAllTime = team.riders.reduce((sum, rider) => {
            return sum + (rider.rider_seasons[0]?.points_all_time || 0);
        }, 0);
        return {
            ...team,
            pointsForYear,
            pointsAllTime
        };
    });

    return (
        <div>
            <Section className="pb-2!">
                <PageHeading>{t("team")}</PageHeading>
            </Section>
            <TeamsTablesSection teamsWithPoints={teamsWithPoints} />
        </div>
    );
}