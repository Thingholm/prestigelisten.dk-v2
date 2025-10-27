import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import DefaultPageSkeleton from "@/components/loading/pages/DefaultPageSkeleton";
import Skeleton from "@/components/loading/skeleton";
import TableSkeleton from "@/components/loading/TableSkeleton";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default async function Loading() {
    return (
        <div>
            <Section color="primary" className="flex-col lg:flex-row items-center">
                <div className="text-justify w-full lg:w-5/12">
                    <BiSolidQuoteAltLeft size={28}/>
                    <Skeleton className="w-full h-6 mb-2" isPrimary/>
                    <Skeleton className="w-full h-6 mb-2" isPrimary/>
                    <Skeleton className="w-2/3 h-6 mb-2" isPrimary/>
                    <Skeleton className="w-40 h-5 mb-8" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-2/3 h-5 mb-4" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-1/3 h-5 mb-4" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-full h-5 mb-1" isPrimary/>
                    <Skeleton className="w-2/3 h-5 mb-1" isPrimary/>
                </div>
                <div className="flex flex-col gap-y-4 w-full lg:w-1/2">
                    <Skeleton className="w-1/2 h-8" isPrimary/>
                    <Container isCard>
                        <TableSkeleton rowCount={15}/>
                    </Container>
                </div>
            </Section>
            <DefaultPageSkeleton/>
            <DefaultPageSkeleton/>
            <Section color="secondary" className="flex-col lg:flex-row">
                <div className="w-full lg:w-7/12">
                    <Skeleton className="w-96 h-8 mb-4" isDark/>
                    <Container isCard>
                        <TableSkeleton rowCount={15}/>
                    </Container>
                </div>
                <div className="w-full lg:w-2/5">
                    <Skeleton className="w-64 h-8 mb-4" isDark/>
                    <Container isCard>
                        <TableSkeleton rowCount={15}/>
                    </Container>
                </div>
            </Section>
        </div>
    )
}