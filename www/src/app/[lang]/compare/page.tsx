import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400;
export const dynamic = 'force-static';

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
                    <Button color="gray" href={{ pathname: "/compare/riders" }}>{t("riders")}</Button>
                    <Button color="gray" href={{ pathname: "/compare/nations" }}>{t("nations")}</Button>
                </div>
            </Container>
        </Section>
    )
}