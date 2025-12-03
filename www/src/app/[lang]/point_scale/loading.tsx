import Section from "@/components/layout/Section";
import Skeleton from "@/components/loading/skeleton";

export default async function Loading() {
    return (
        <div>
            <Section className="!pb-0">
                <Skeleton className="w-96 h-8"/>
            </Section>
            <Section className="flex-col">
                {Array.from({ length: 25 }, (_, index) => (
                    <Skeleton className="w-full h-12" key={index}/>
                ))}
            </Section>
        </div>
    )
}