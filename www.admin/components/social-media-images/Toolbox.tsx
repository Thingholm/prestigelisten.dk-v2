import { Dispatch, SetStateAction } from "react";
import { Settings } from "./ContentWrapper";
import { Rider } from "@/lib/db/riders";
import { RankingEvolution } from "@/app/dashboard/some-images/[id]/page";
import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { Label } from "../ui/label";

export default function Toolbox({
    settings,
    setSettings,
    rider,
    rankingEvolutions
}: Readonly<{
    settings: Settings,
    setSettings: Dispatch<SetStateAction<Settings>>,
    rider: Rider,
    rankingEvolutions: RankingEvolution[] | null
}>) {
    const setChecked = (key: keyof Settings, value: boolean | string) => {
        setSettings({ ...settings, [key]: typeof value == "string" ? true : value });
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-2 items-center">
                <p>Tekststørrelse</p>
                <input 
                    type="number" 
                    value={settings.textSize} 
                    onChange={(e) => setSettings({ ...settings, textSize: parseInt(e.target.value) })} 
                    className="border border-secondary rounded-md px-1 max-w-20"
                />                
            </div>

            <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <p>Farve</p>
                    <input type="color" value={settings.colorHex} onChange={(e) => setSettings({ ...settings, colorHex: e.target.value })} />
                </div>
                <Field orientation="horizontal">
                    <Checkbox name="white-text" checked={settings.whiteText} onCheckedChange={(e) => setChecked("whiteText", e)} />
                    <Label htmlFor="white-text">Hvid tekst</Label>
                </Field>
            </div>

            <div className="flex gap-8 flex-wrap">
                <Field orientation="horizontal">
                    <Checkbox name="all-time" checked={settings.showAllTimeRanking} onCheckedChange={(e) => setChecked("showAllTimeRanking", e)} />
                    <Label htmlFor="all-time">All time</Label>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox name="active" checked={settings.showActiveRanking} onCheckedChange={(e) => setChecked("showActiveRanking", e)} disabled={!rider.active}/>
                    <Label htmlFor="active">Aktive</Label>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox name="nation" checked={settings.showNationsRanking} onCheckedChange={(e) => setChecked("showNationsRanking", e)} />
                    <Label htmlFor="nation">Nation</Label>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox name="birth-year" checked={settings.showBirthYearRanking} onCheckedChange={(e) => setChecked("showBirthYearRanking", e)} />
                    <Label htmlFor="birth-year">Årgang</Label>
                </Field>
            </div>

            <div className="flex flex-col gap-4">
                <Field orientation="horizontal">
                    <Checkbox name="show-latest-result" checked={settings.showLatestResult} onCheckedChange={(e) => setChecked("showLatestResult", e)} disabled={!rankingEvolutions?.find(e => e.results.some(r => r.key == rider.id))}/>
                    <Label htmlFor="show-latest-result">Vis seneste resultat</Label>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox name="show-active-ranking-table" checked={settings.showActiveRankingTable} onCheckedChange={(e) => setChecked("showActiveRankingTable", e)} disabled={!rider.active}/>
                    <Label htmlFor="show-active-ranking-table">Vis tabel for aktive</Label>
                </Field>
            </div>

            <div className="flex gap-2">
                <p>Sortér resultater efter</p>
                <select 
                    value={settings.sortResultsBy} 
                    onChange={(e) => setSettings({ ...settings, sortResultsBy: e.target.value as "accumulated" | "isolated" })}
                    className="border border-secondary rounded-md px-1"
                >
                    <option value="accumulated">Samlet antal point</option>
                    <option value="isolated">Enkelt resultat</option>
                </select>
            </div>
        </div>
    )
}