import Section from "@/components/layout/Section";
import Skeleton from "@/components/loading/skeleton";
import TableSkeleton from "@/components/loading/TableSkeleton";

export default async function Loading() {
    return (
        <div>
            <Section className="!pb-0">
                <Skeleton className="w-96 h-8"/>
            </Section>
            <Section>
                <TableSkeleton rowCount={50}/>
            </Section>
        </div>
    )
}