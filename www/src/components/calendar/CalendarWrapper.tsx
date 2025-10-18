import { getCalendar } from "@/db/calendar";
import { getPointSystem } from "@/db/pointSystem";
import Calendar from "./Calendar";

export type RaceEvent = {
  id: number;
  name: string;
  race_class_id: number;
  meta_race_id: number;
  startDate: string;
  endDate: string;
  color: string | null;
  darkText: boolean;
}

export default async function CalendarWrapper() {
    const calendar = await getCalendar();
    const pointSystem = await getPointSystem();

    const flatCalendar: RaceEvent[] | null = calendar?.map(race => {
        return {
            id: race.id,
            name: race.races!.meta_races.name,
            race_class_id: race.races!.race_class_id,
            meta_race_id: race.races?.meta_races.id,
            startDate: race.start_date,
            endDate: race.end_date,
            color: race.races!.meta_races.color_hex,
            darkText: race.races!.meta_races.dark_text
        }
    })

    if (!flatCalendar) return null

    return (
        <Calendar calendar={flatCalendar} pointSystem={pointSystem}/>
    )
}