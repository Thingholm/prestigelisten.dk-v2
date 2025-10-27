import { getTranslations } from "next-intl/server"
import Image from "next/image";
import logo from "@/../public/logo.jpg"
import Link from "next/link";
import { getRidersListUrl } from "@/lib/helpers/urls";
import { urls } from "@/lib/constants/urls";


export default async function Footer() {
    const t = await getTranslations("navigation");

    return (
        <footer className="bg-secondary-950 text-white py-8 px-3 sm:px-16 w-full">
            <div className="flex flex-col lg:flex-row gap-x-20 gap-y-4">
                <div className="h-52 w-52">
                    <Image
                        src={logo}
                        alt="Prestigelisten logo"
                        width={200}
                        height={200}
                    />
                </div>
                <div>
                    <h4 className="font-bold opacity-50 uppercase mb-2">{t("lists")}</h4>
                    <ul>
                        <li><Link className="hover:underline hover:text-primary-500" href={getRidersListUrl()}>{t("ridersAlltime")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={getRidersListUrl({ status: "active" })}>{t("active")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={getRidersListUrl({ nations: [14] })}>{t("danish")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["listNations"]}>{t("nations")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["listRiders3YearPeriod"]}>{t("3YearPeriod")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["listRidersGreatestSeasons"]}>{t("greatestSeasons")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["year"]}>{t("mostPointsEachYear")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["listRidersAges"]}>{t("greatestByAge")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={getRidersListUrl({ isSingleYear: true })}>{t("greatestByYear")}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold opacity-50 uppercase mb-2">{t("more")}</h4>
                    <ul>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["about"]}>{t("about")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["pointSystem"]}>{t("pointSystem")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["team"]}>{t("teams")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["compare"]}>{t("compare")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["calendar"]}>{t("calendar")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["rawData"]}>{t("rawData")}</Link></li>
                        <li><Link className="hover:underline hover:text-primary-500" href={urls["quiz"]}>{t("quiz")}</Link></li>                        
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold opacity-50 uppercase mb-2">{t("contact")}</h4>
                    <ul>
                        <li><Link className="hover:underline hover:text-primary-500" href="mailto:prestigelisten@hotmail.com">prestigelisten@hotmail.com</Link></li>                   
                    </ul>
                </div>
            </div>
            <div className="mt-8">
                <p>{t("developer")} <Link href="mailto:rasmusthingholm@gmail.dk" className="underline hover:text-primary-500">rasmusthingholm@gmail.dk</Link>.</p>
            </div>
        </footer>
    )
}