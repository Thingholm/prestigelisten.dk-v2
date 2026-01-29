import { Dispatch, SetStateAction } from "react";
import { Settings } from "./ContentWrapper";
import { Rider } from "@/db/rider";
import { RankingEvolution } from "@/lib/helpers/rankingEvolution";
import Checkbox from "@/components/ui/Checkbox";

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
                <Checkbox label="Hvid tekst" isChecked={settings.whiteText} onChange={(e) => setSettings({ ...settings, whiteText: e.target.checked })} />
            </div>

            <div className="flex gap-8 flex-wrap">
                <Checkbox label="All time" isChecked={settings.showAllTimeRanking} onChange={(e) => setSettings({ ...settings, showAllTimeRanking: e.target.checked })} />
                <Checkbox label="Aktive" isChecked={settings.showActiveRanking} onChange={(e) => setSettings({ ...settings, showActiveRanking: e.target.checked })} isDisabled={!rider.active}/>
                <Checkbox label="Nation" isChecked={settings.showNationsRanking} onChange={(e) => setSettings({ ...settings, showNationsRanking: e.target.checked })} />
                <Checkbox label="Årgang" isChecked={settings.showBirthYearRanking} onChange={(e) => setSettings({ ...settings, showBirthYearRanking: e.target.checked })} />
            </div>

            <div className="flex flex-col gap-4">
                <Checkbox label="Vis seneste resultat"  isChecked={settings.showLatestResult} onChange={(e) => setSettings({ ...settings, showLatestResult: e.target.checked })} isDisabled={!rankingEvolutions?.find(e => e.results.some(r => r.key == rider.id))}/>
                <Checkbox label="Vis tabel for aktive"  isChecked={settings.showActiveRankingTable} onChange={(e) => setSettings({ ...settings, showActiveRankingTable: e.target.checked })} isDisabled={!rider.active}/>
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