import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import HeroTable from "./_tables/HeroTable";
import Container from "@/components/layout/Container";
import { getAboutUrl, getListRidersUrl } from "@/lib/helpers/urls";
import { RidersWithNationAndTeam } from "@/db/rider";

export default function HeroSection({
    ridersWithNationAndTeam = [],
}: Readonly<{
    ridersWithNationAndTeam: RidersWithNationAndTeam;
}>) {
    const t = useTranslations("homepage");

    return (
        <Section color="primary" className="flex-col lg:flex-row items-center">
            <div className="text-justify w-full lg:w-5/12">
                <BiSolidQuoteAltLeft size={28}/>
                <p className="font-bold text-lg mb-2">{t("quote")}</p>
                <p className="italic mb-8">- {t("author")}</p>
                <p className="mb-4">{t("description1")}</p>
                <p className="mb-8">{t("description2")}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <Button href={getListRidersUrl()} color="secondary">
                        {t("exploreButton")}
                    </Button>
                    <Button href={getAboutUrl()} color="secondary" variant="text">
                        {t("moreButton")}
                    </Button>
                </div>
            </div>
            <Container 
                className="w-full lg:w-1/2" 
                isCard 
                title={t("tableTitles.allTimePoints")} 
                href={getListRidersUrl()}
            >
                <HeroTable ridersWithNationAndTeam={ridersWithNationAndTeam.slice(0, 17)} />
            </Container>
        </Section>
    );
}