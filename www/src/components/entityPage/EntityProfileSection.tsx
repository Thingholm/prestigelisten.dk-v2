import { ReactElement } from "react"
import Section from "../layout/Section"
import ProfileMainSection from "./ProfileMainSection";
import ProfileHighlightSection from "./ProfileHighlightSection";

export default function EntityProfileSection({
    children
}: Readonly<{
    children: [ReactElement<typeof ProfileMainSection>, ReactElement<typeof ProfileHighlightSection>] | ReactElement<typeof ProfileMainSection>;
}>) {
    return (
        <Section className="flex-wrap">
            {children}
        </Section>
    )
}