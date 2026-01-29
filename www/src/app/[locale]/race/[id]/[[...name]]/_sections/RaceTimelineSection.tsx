"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { MetaRace } from "@/db/race";
import { ResultsInRaceRange } from "@/db/results";
import { raceClassColors } from "@/lib/constants/colors";
import { Tooltip } from "@heroui/tooltip";
import { useTranslations } from "next-intl";

export default function RaceTimelineSection({
    metaRace,
    results,
    firstRaceYear
}: Readonly<{
    metaRace: MetaRace,
    results: ResultsInRaceRange,
    firstRaceYear: number
}>) {
    const t = useTranslations("racePage.timeline");
    const tRaceClasses = useTranslations("raceClasses");

    const currentYear = new Date().getFullYear();
    const yearsCount = currentYear - firstRaceYear + 1;

    const raceSpans = metaRace.races.map(race => {
        const spans = race.active_span_string
            ?.replace("(","")
            .replace(")","")
            .replaceAll(" ","")
            .split("+")
            .map(spanString => {
                const span = {
                    startYear: 0,
                    endYear: 0
                }

                if (spanString.includes("-")) {
                    span.startYear = parseInt(spanString.split("-")[0]);
                    span.endYear = parseInt(spanString.split("-")[1]);
                } else if (spanString.includes(">")) {
                    span.startYear = parseInt(spanString.replace(">","")) + 1;
                    if (race.active) {
                        span.endYear = currentYear;
                    } else {
                        span.endYear = results.findLast(() => true)?.year ?? currentYear
                    }
                } else if (spanString.includes("<")) {
                    span.startYear = results[0]?.year ?? 1876;
                    span.endYear = parseInt(spanString.replace("<","")) - 1;
                } else {
                    span.startYear = parseInt(spanString);
                    span.endYear = parseInt(spanString);
                }

                return span;
            }) ?? [{
                startYear: results[0]?.year ?? currentYear,
                endYear: (race.active ? currentYear : results.findLast(() => true)?.year ?? currentYear)
            }]

        return {
            race: race,
            spans: spans
        }
    })

    return (
        <Section>
            <Container title={t("title")}>
                <div className="mb-2">
                    <p className="font-medium">{t("pointClasses")}:</p>
                    <div className="flex flex-wrap">
                        {metaRace.races?.map(race => {
                            const color = raceClassColors[race.race_class_id] ?? "#1a1a1a"
                            return (
                                <div key={race.id} className="flex items-center mr-8">
                                    <div style={{ backgroundColor: color}} className="h-4 w-4 rounded-full mr-2"></div>
                                    <p>{tRaceClasses(race.race_class_id.toString())}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div className="flex h-6 relative w-full z-10">
                        {raceSpans?.map(race => (
                            <div key={race.race.id}>
                                {
                                    race.spans?.map(raceSpan => (
                                        <Tooltip
                                            key={race.race.id + raceSpan.startYear + raceSpan.endYear}
                                            color="secondary"
                                            content={
                                                <div className="bg-secondary-950 text-white px-3 py-2 rounded-xl">
                                                    <p>{t("pointClass")}: <span className="font-medium">{tRaceClasses(race.race.race_class_id.toString())}</span></p>
                                                    <p>{t("from")}: <span className="font-medium">{raceSpan.startYear}</span></p>
                                                    <p>{t("to")}: <span className="font-medium">{raceSpan.endYear == currentYear ? "-" : raceSpan.endYear}</span></p>
                                                </div>
                                            }
                                        >
                                            <div 
                                                className="absolute text-nowrap rounded-md h-4" 
                                                style={{
                                                    left: ((raceSpan.startYear ?? 0) - 1876) / yearsCount * 100 + "%",
                                                    width: ((raceSpan.endYear ?? 0) - (raceSpan.startYear ?? 0) + 1) / yearsCount * 100 + "%",
                                                    backgroundColor: raceClassColors[race.race.race_class_id] ?? "#1a1a1a",
                                                }}
                                            >
                                            </div>
                                        </Tooltip>

                                    ))
                                }
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        {[...Array(yearsCount)].map((_, index) => {
                            const year = index + 1876

                            return (
                                <p key={index} style={{width: 100 / yearsCount * 100 + "%"}} className="relative">
                                    {((year % 20 == 0 && year != 1880 && year != 2020) || year == 1876 || year == currentYear) && 
                                        <span className="relative">
                                            {year}
                                            <span className={`h-7 w-px bg-secondary-950 opacity-30 block absolute bottom-full ${(year != 1876 && year != currentYear) ? "left-1/2" : (year == currentYear ? "right-0" : "")}`}></span>
                                        </span>
                                    }
                                </p>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </Section>
    )
}