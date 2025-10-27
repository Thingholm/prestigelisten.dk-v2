import Section from "@/components/layout/Section";
import Skeleton from "../skeleton";

export default function EntityPageSkeleton() {
    return (
        <div>
            <Section className="flex flex-wrap">
                <div className="flex flex-col w-full sm:w-fit sm:flex-row gap-x-4 items-center">
                    <Skeleton className="h-52 w-52 !rounded-2xl mb-2 sm:mb-0"/>
                    <div className="flex flex-col items-center sm:items-start gap-y-1.5">
                        <Skeleton className="h-9 w-72 mb-3"/>
                        <Skeleton className="h-5 w-64"/>
                        <Skeleton className="h-5 w-44"/>
                        <Skeleton className="h-5 w-56"/>
                        <Skeleton className="h-5 w-48"/>
                        <Skeleton className="h-5 w-52"/>
                    </div>
                </div>
                <Skeleton className="!rounded-xl w-full lg:w-1/3 h-52"/>
            </Section>
            <Section color="secondary" className="gap-x-6">
                <Skeleton className="h-[28rem] w-full !rounded-2xl" isDark/>
                <Skeleton className="h-[28rem] w-full !rounded-2xl" isDark/>
            </Section>
            <Section>
                <Skeleton className="h-[30rem] w-full !rounded-2xl"/>
            </Section>            
            <Section color="gray">
                <Skeleton className="h-[30rem] w-full !rounded-2xl"/>
            </Section>
        </div>
    )
}