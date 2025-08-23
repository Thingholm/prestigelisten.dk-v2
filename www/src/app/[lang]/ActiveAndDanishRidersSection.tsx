import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { RiderPointsWithNationAndTeam } from "@/db/riderPoints";
import { useTranslations } from "next-intl";
import ActiveRidersTable from "./(tables)/ActiveRidersTable";
import DanishRidersTable from "./(tables)/DanishRidersTable";
import { getListRidersUrl } from "@/lib/helpers/urls";

export default function ActiveAndDanishRidersSection({
    riderPointsWithNationAndTeam,
}: Readonly<{
    riderPointsWithNationAndTeam: RiderPointsWithNationAndTeam;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section color="secondary" className="flex-col lg:flex-row">
            <Container 
                title={t("tableTitles.greatestActiveRiders")} 
                dark 
                isCard 
                href={getListRidersUrl(null, true)} 
                className="lg:w-7/12"
            >
                <ActiveRidersTable riderPointsWithNationAndTeam={riderPointsWithNationAndTeam} />
            </Container>
            <Container 
                title={t("tableTitles.greatestDanishRiders")} 
                dark 
                isCard 
                href={getListRidersUrl({id: 14, name: "Danmark"})} 
                className="lg:w-2/5"
            >
                <DanishRidersTable riderPointsWithNationAndTeam={riderPointsWithNationAndTeam} />
            </Container>
        </Section>
    );
}