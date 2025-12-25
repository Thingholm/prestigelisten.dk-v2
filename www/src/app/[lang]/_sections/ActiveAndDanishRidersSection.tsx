import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { useTranslations } from "next-intl";
import ActiveRidersTable from "../_tables/ActiveRidersTable";
import DanishRidersTable from "../_tables/DanishRidersTable";
import { getListRidersUrl } from "@/lib/helpers/urls";
import { RidersWithNationAndTeam } from "@/db/rider";

export default function ActiveAndDanishRidersSection({
    ridersWithNationAndTeam,
}: Readonly<{
    ridersWithNationAndTeam: RidersWithNationAndTeam;
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
                <ActiveRidersTable ridersWithNationAndTeam={ridersWithNationAndTeam} />
            </Container>
            <Container 
                title={t("tableTitles.greatestDanishRiders")} 
                dark 
                isCard 
                href={getListRidersUrl({id: 14, name: "Danmark"})} 
                className="lg:w-2/5"
            >
                <DanishRidersTable ridersWithNationAndTeam={ridersWithNationAndTeam} />
            </Container>
        </Section>
    );
}