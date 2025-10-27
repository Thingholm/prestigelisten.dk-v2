import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import logo from "@/../public/logo.jpg"
import Button from "@/components/ui/Button";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default async function SocialMediaSection() {
    const t = await getTranslations("homepage");

    return (
        <Section>
            <Container title={t("tableTitles.socialMedia")}>
                <div className="flex justify-center pt-12">
                    <div className="flex flex-col relative gap-y-4 text-center items-center border-[1px] border-secondary-300 rounded-2xl w-full md:max-w-2/3 pb-8 pt-40">
                        <Image
                            src={logo}
                            height={200}
                            width={200}
                            alt="Prestigelisten logo"
                            className="rounded-full absolute -top-12 border-8 border-white"
                        />
                        <p className="font-semibold text-2xl">@prestigelisten</p>
                        <p className="w-4/5 sm:w-3/4">{t("socialMediaText")}</p>
                        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4">
                            <Button 
                                href="https://x.com/prestigelisten" 
                                className="flex items-center gap-x-2 !py-2" 
                                color="secondary"
                                target="blank"
                            >
                                <FaXTwitter size={20}/> X/Twitter
                            </Button>
                            <Button 
                                href="https://www.instagram.com/prestigelisten" 
                                className="flex items-center gap-x-2 !py-2"
                                color="secondary"
                                target="blank"
                            >
                                <FaInstagram size={20}/> Instagram
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}