import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { urls } from "@/lib/constants/urls";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'metadata.compare'});
    
    return {
        title: t('title'),
        description: t("description")
    };
}

export default async function Page(){
    const t = await getTranslations("comparePage");

    return (
        <Section>
            <Container title={t("title")}>
                <div className="flex gap-x-4">
                    <Button color="gray" href={urls["compareRiders"]}>{t("riders")}</Button>
                    <Button color="gray" href={urls["compareNations"]}>{t("nations")}</Button>
                </div>
            </Container>
        </Section>
    )
}