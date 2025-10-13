import Card from "../layout/Card";

export default function ProfileHighlightSection({
    title,
    children,
    isGroupedResults = false
}: Readonly<{
    title: string;
    children: React.ReactNode;
    isGroupedResults?: boolean
}>) {
    return (
        <Card color="gray" className={`${isGroupedResults ? "!pl-12" : ""} w-full lg:w-1/3 block!`}>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <div>
                {children}
            </div>
        </Card>
    );
}