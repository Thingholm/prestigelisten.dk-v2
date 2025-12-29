import { RidersFilter } from "@/app/[lang]/rankings/riders/_sections/ListSection";
import { urls } from "../constants/urls";

type Rider = {
    id: number;
    first_name: string | null;
    last_name: string;
}

export function getRiderUrl(rider: Rider) {
    let url = urls["rider"];

    if (rider.first_name) {
        url += `/${rider.id}/${rider.first_name.replaceAll(" ", "_").toLowerCase()}_${rider.last_name.replaceAll(" ", "_").toLowerCase()}`.replaceAll(".", "")
    } else {
        url += `/${rider.id}/${rider.last_name.replaceAll(" ", "_").toLowerCase()}`
    }

    return url;
}

type Nation = {
    id: number;
    name: string;
}

export function getNationUrl(nation: Nation | null) {
    if (!nation) {
        return urls["nations"];
    }
    
    return `${urls["nation"]}/${nation.id}/${nation.name.replaceAll(" ", "_").toLowerCase()}`;
}

export function getYearUrl(year?: number | null) {
    if (!year) {
        return urls["year"];
    }

    return `${urls["year"]}/${year}`;
}

export function getListRidersUrl(nation?: Nation | null, active?: boolean) {
    let url = urls["listRiders"];

    if (nation) {
        url += `&nations=${nation.id}`;
    } else if (active === true) {
        url += `&status=activeOnly`;
    } else if (active === false) {
        url += `&status=inactiveOnly`;
    }

    url = url.replace("&", "?");

    return url
}

export function getAboutUrl() {
    return urls["about"];
}

type Team = {
    id: number;
    name: string;
}

export function getTeamUrl(team: Team | null) {
    if (!team) {
        return urls["teams"];
    }

    return `${urls["team"]}/${team.id}/${team.name.replaceAll(" ", "_").replaceAll(".", "").toLowerCase()}`;
}

export function getListNationsUrl() {
    return urls["listNations"];
}

export function getGreatestSeasonsUrl() {
    return urls["listRidersGreatestSeasons"];
}

type MetaRace = {
    id: number;
    name: string;
}

export function getRaceUrl(race: MetaRace) {
    return `${urls["race"]}/${race.id}/${race.name.replaceAll(" ", "_").toLowerCase()}`;
}

export function getRiders3YearRollingRankingsUrl() {
    return urls["listRiders3YearPeriod"];
}

export function getRidersListUrl(filter?: Partial<RidersFilter>): string {
    const params = new URLSearchParams();

    if (filter) {
        if (filter.status) params.set("status", filter.status);
        if (filter.isSingleYear) params.set("isSingleYear", filter.isSingleYear.toString());
        if (filter.bornBeforeOrIn) params.set("bornBeforeOrIn", filter.bornBeforeOrIn.toString());
        if (filter.bornAfterOrIn) params.set("bornAfterOrIn", filter.bornAfterOrIn.toString());
        if (filter.nations) filter.nations.forEach(nation => nation && params.append("nations", nation.toString()))
    }

    const query = params.toString();
    return query ? `${urls["listRiders"]}?${query}` : urls["listRiders"];
}

export function deserializeQueryString(query?: string) {
    if (!query) return "";

    return query
        .replaceAll("%7C", "|")
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}