import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";
import { getMaxRiderAge, getMinRiderAge, getRiderPointsByAge } from "@/db/riderPointsByAge";
import { getTranslations } from "next-intl/server";
import SelectAgeSection from "./_sections/SelectAgeSection";
import { rankBy } from "@/lib/helpers/rank";
import RiderPointsByAgeTable from "./_tables/RiderPointsByAgeTable";

export default async function AgePage({
    params
}: Readonly<{
    params: Promise<{ age: number }>
}>) {
    const age = (await params).age;

    const t = await getTranslations("lists.riderAge");

    const riderPointsByAge = await getRiderPointsByAge(age);
    const minRiderAge = await getMinRiderAge();
    const maxRiderAge = await getMaxRiderAge();

    const rankedRiderPoints = rankBy(riderPointsByAge, "points");

    return (
        <div>
            <Section className="!pb-0">
                <PageHeading>{t("ageTitle", { age: age })}</PageHeading>
            </Section>
            <SelectAgeSection
                selectedAge={age}
                minAge={minRiderAge}
                maxAge={maxRiderAge}
            />
            <Section>
                <RiderPointsByAgeTable riderPointsByAge={rankedRiderPoints}/>
            </Section>
        </div>
    )
}