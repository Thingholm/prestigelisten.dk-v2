import Section from "@/components/layout/Section";
import Skeleton from "../skeleton";

export default async function DefaultPageSkeleton() {
    return (
        <Section className="flex-col gap-y-4">
            <Skeleton className="h-8 w-96"/>
            <Skeleton className="h-[40rem] w-full"/>
        </Section>
    )
}