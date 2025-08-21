import { urls } from "../constants/urls";

type Rider = {
    id: number;
    first_name: string | null;
    last_name: string;
}

export function getRiderUrl(rider: Rider) {
    let url = urls["rider"];

    if (rider.first_name) {
        url += `/${rider.id}/${rider.first_name.replaceAll(" ", "_").toLowerCase()}_${rider.last_name.replaceAll(" ", "_").toLowerCase()}`
    } else {
        url += `/${rider.id}/${rider.last_name.replaceAll(" ", "_").toLowerCase()}`
    }

    return url;
}

type Nation = {
    id: number;
    name: string;
}

export function getNationUrl(nation: Nation) {
    return `${urls["nation"]}/${nation.id}/${nation.name.replaceAll(" ", "_").toLowerCase()}`;
}

export function getYearUrl(year: number | null) {
    if (!year) {
        return urls["year"];
    }

    return `${urls["year"]}/${year}`;
}

export function getListRidersUrl() {
    return urls["listRiders"];
}

export function getAboutUrl() {
    return urls["about"];
}