import { ReactElement } from "react";
import ProfileDetailsSection from "./ProfileDetails";
import TeamLogo from "./TeamLogo";

export default function ProfileMainSection({
    children
}: Readonly<{
    children: ReactElement<typeof ProfileDetailsSection | typeof TeamLogo>[];
}>) {
    return (
        <div className="flex items-center flex-col w-full sm:flex-row sm:w-fit">
            {children}
        </div>
    )
}