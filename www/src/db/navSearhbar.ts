import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getNavSearchbarData = unstable_cache(async () => {
    const { data: ridersData, error: ridersError } = await ridersQuery;
    if (ridersError) { throw ridersError; }

    const { data: nationsData, error: nationsError } = await nationsQuery;
    if (nationsError) { throw nationsError; }

    const { data: racesData, error: racesError } = await racesQuery;
    if (racesError) { throw racesError; }

    const { data: teamsData, error: teamsError } = await teamsQuery;
    if (teamsError) { throw teamsError; }

    return {
        riders: ridersData.sort((a, b) => (b.rider_points[0]?.points) - (a.rider_points[0]?.points)),
        nations: nationsData.sort((a, b) => (b.nation_points[0]?.points) - (a.nation_points[0]?.points)),
        races: racesData.sort((a, b) => Math.min(...a.races.map(r => r.race_classes.sorting_index)) - Math.min(...b.races.map(r => r.race_classes.sorting_index))),
        teams: teamsData
    } as NavSearchbarData
}, ["navSearchbarData"], { revalidate: 60 * 60})

const ridersQuery = supabase
    .from("riders")
    .select(`
        *,
        rider_points (*)
    `);

const nationsQuery = supabase
    .from("nations")
    .select(`
        *,
        nation_points (*)    
    `);

const racesQuery = supabase
    .from("meta_races")
    .select(`
        *,
        races (
            race_classes (
                sorting_index
            )
        )
    `)
    .order("name");

const teamsQuery = supabase
    .from("teams")
    .select("*")
    .order("name");

export type NavSearchbarRider = QueryData<typeof ridersQuery>[number];
export type NavSearchbarNation = QueryData<typeof nationsQuery>[number];
export type NavSearchbarRace = QueryData<typeof racesQuery>[number];
export type NavSearchbarTeam = QueryData<typeof teamsQuery>[number];
export type NavSearchbarData = {
    riders: NavSearchbarRider[]
    nations: NavSearchbarNation[]
    races: NavSearchbarRace[]
    teams: NavSearchbarTeam[]
}