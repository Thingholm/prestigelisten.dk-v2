import Card from "../layout/Card";

export default function ProfileHighlightSection({
    title,
    children
}: Readonly<{
    title: string;
    children: React.ReactNode;
}>) {
    return (
        <Card color="gray" className="w-full lg:w-1/3 block!">
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <div>
                {children}
            </div>
        </Card>
    );
}