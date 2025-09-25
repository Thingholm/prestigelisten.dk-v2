import { EntityProfileSection, ProfileAttribute, ProfileDetails, ProfileHighlightSection, ProfileMainSection, ProfileTitle } from "@/components/entityPage";
import RaceLogo from "@/components/entityPage/RaceLogo";
import FlagSpan from "@/components/table/FlagSpan";
import { PointSystem } from "@/db/pointSystem";
import { MetaRace } from "@/db/race";
import { ResultsInRaceRange } from "@/db/results";
import { urls } from "@/lib/constants/urls";
import { getRaceName } from "@/lib/helpers/raceName";
import { getNationUrl, getYearUrl } from "@/lib/helpers/urls";
import { useTranslations } from "next-intl";

export default function ProfileSection({
    race,
    latestEdition,
    firstEdition,
    latestEditionRaceClass,
    pointSystem
}: Readonly<{
    race: MetaRace
    firstEdition?: ResultsInRaceRange[number]
    latestEdition?: ResultsInRaceRange[number]
    latestEditionRaceClass?: MetaRace["races"][number]["race_classes"]
    pointSystem: PointSystem
}>) {
    const t = useTranslations("racePage");
    const tResultNames = useTranslations("getResultNames");
    const tNations = useTranslations("nations");
    const tRaceClasses = useTranslations("raceClasses");

    const isActive = race.races.some(r => r.active);

    
    return (
        <EntityProfileSection>
            <ProfileMainSection>
                <RaceLogo metaRace={race}/>
                <ProfileDetails>
                    <ProfileTitle>{getRaceName(race, tResultNames)}</ProfileTitle>

                    <ProfileAttribute label={t("profile.nation")} href={getNationUrl(race.nations)}>
                        {(race.nations?.code 
                            ? <><FlagSpan code={race.nations.code}/>{tNations(`${race.nations.code}.name`)}</>
                            : "-"
                        )}
                    </ProfileAttribute>

                    <ProfileAttribute label={isActive ? t("profile.currentPointSystem") : t("profile.latestPointSystem")} href={`${urls["pointSystem"]}/#${latestEditionRaceClass?.id}`}>
                        {tRaceClasses(latestEditionRaceClass?.id.toString() ?? "0")}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.active")}>
                        {isActive ? t("profile.activeAnswer.yes") : t("profile.activeAnswer.no")}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.firstEdition")} href={getYearUrl(firstEdition?.year)}>
                        {firstEdition?.year}
                    </ProfileAttribute>

                    <ProfileAttribute label={t("profile.latestEdition")} href={getYearUrl(latestEdition?.year)}>
                        {latestEdition?.year}
                    </ProfileAttribute>
                </ProfileDetails>
            </ProfileMainSection>
            <ProfileHighlightSection title={t("profile.pointSystem", { race:  tRaceClasses(latestEditionRaceClass?.id.toString() ?? "0")})}>
                {pointSystem.filter(ps => ps.race_class_id == latestEditionRaceClass?.id)
                    .map(ps => (
                        <p key={ps.id}>
                            <span>{tResultNames(`resultTypes.${ps.result_type_id}`)}: </span>
                            <span className="font-medium">{ps.points}p</span>
                        </p>
                    )
                )}
            </ProfileHighlightSection>
        </EntityProfileSection>
    )
}