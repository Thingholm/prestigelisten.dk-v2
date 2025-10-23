import React, { ReactElement } from "react";
import ProfileTitle from "./ProfileTitle";
import ProfileAttribute from "./ProfileAttribute";

export default function ProfileDetails({
    children
}: Readonly<{
    children: [ReactElement<typeof ProfileTitle>, ...(ReactElement<typeof ProfileAttribute> | false)[]]
}>) {
    return (
        <div className="ml-4 text-center sm:text-start">
            {children}
        </div>
    )
}