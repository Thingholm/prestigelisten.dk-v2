import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Section from "@/components/layout/Section";
import PageHeading from "@/components/ui/PageHeading";

export default async function Page() {
    const t = await getTranslations("omPrestigelisten");

    return (
        <Section className="flex-col text-justify">
            <PageHeading>{t("title")}</PageHeading>
            <p className="mt-4">{t("description1")}</p>
            <p>{t("description2")}</p>
            <p>{t("description3")}</p>
            <p>{t("description4")}</p>
            <p>{t("description5")}</p>
            <ul className="pl-4">
                <li className="list-disc mb-2"><Link href="/listen/ryttere" className="decoration-dotted underline hover:decoration-solid">{t("list1")}</Link></li>
                <li className="list-disc mb-2"><Link href="/listen/ryttere" className="decoration-dotted underline hover:decoration-solid">{t("list2")}</Link></li>
                <li className="list-disc mb-2"><Link href="/listen/nationer" className="decoration-dotted underline hover:decoration-solid">{t("list3")}</Link></li>
                <li className="list-disc mb-2"><Link href="/listen/ryttere" className="decoration-dotted underline hover:decoration-solid">{t("list4")}</Link></li>
                <li className="list-disc mb-2"><Link href="/listen/ryttere/3-årig_periode" className="decoration-dotted underline hover:decoration-solid">{t("list5")}</Link></li>
                <li className="list-disc mb-2"><Link href="/år" className="decoration-dotted underline hover:decoration-solid">{t("list6")}</Link></li>
                <li className="list-disc mb-2"><Link href="/listen/ryttere" className="decoration-dotted underline hover:decoration-solid">{t("list7")}</Link></li>
                <li className="list-disc mb-2"><Link href="/år" className="decoration-dotted underline hover:decoration-solid">{t("list8")}</Link></li>
                <li className="list-disc mb-2"><Link href="/år" className="decoration-dotted underline hover:decoration-solid">{t("list9")}</Link></li>
            </ul>
            <p>{t("description6")}</p>
            <p>{t("description7")}</p>
            <p>{t("description8")}</p>
            <p>{t("description9")} <Link href="mailto:prestigelisten@hotmail.com" className="decoration-dotted underline hover:decoration-solid">prestigelisten@hotmail.com</Link>{t("description9pt2")}<Link href="https://x.com/prestigelisten" className="decoration-dotted underline hover:decoration-solid">@prestigelisten</Link>.</p>
            <p>{t("description10")}</p>
            <p>{t("description11")}</p>
        </Section>
    )
}