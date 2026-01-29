import { RidersFilter } from "@/app/[locale]/rankings/riders/_sections/ListSection";
import { urls } from "../constants/urls";
import { Link } from "@/i18n/navigation";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;
type Href = LinkProps['href'];

type Rider = {
    id: number;
    first_name: string | null;
    last_name: string;
}

export function getRiderUrl(rider: Rider): Href {
    const riderName = rider.first_name
        ? `${rider.first_name.replaceAll(" ", "_").toLowerCase()}_${rider.last_name.replaceAll(" ", "_").toLowerCase()}`.replaceAll(".", "")
        : rider.last_name.replaceAll(" ", "_").toLowerCase()

    return {
        pathname: "/rider/[rider]/[[...name]]",
        params: {
            rider: rider.id,
            name: [riderName]
        }
    };
}

type Nation = {
    id: number;
    name: string;
}

export function getNationUrl(nation: Nation | null): Href {
    if (!nation) {
        return {
            pathname: "/"
        }
    }
    
    return {
        pathname: "/nation/[nation]/[[...name]]",
        params: {
            nation: nation.id,
            name: [nation.name.replaceAll(" ", "_").toLowerCase()]
        }
    };
}

export function getYearUrl(year?: number | null): Href {
    if (!year) {
        return {
            pathname: "/year"
        };
    }

    return {
        pathname: "/year/[year]",
        params: {
            year: year
        }
    }
}

export function getYearUrlString(year: number): string {
    return `/year/${year}`
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

export function getAboutUrl(): Href {
    return {
        pathname: "/about_prestigelisten"
    };
}

type Team = {
    id: number;
    name: string;
}

export function getTeamUrl(team: Team | null): Href {
    if (!team) {
        return {
            pathname: "/team"
        };
    }

    return {
        pathname: "/team/[team]/[[...name]]",
        params: {
            team: team.id,
            name: [team.name.replaceAll(" ", "_").replaceAll(".", "").toLowerCase()]
        }
    }
}

export function getListNationsUrl(): Href {
    return {
        pathname: "/rankings/nations"
    };
}

export function getGreatestSeasonsUrl(): Href {
    return {
        pathname: "/rankings/riders/greatest_seasons"
    };
}

type MetaRace = {
    id: number;
    name: string;
}

export function getRaceUrl(race: MetaRace):  {
    pathname: "/race/[race]/[[...name]]";
    params: {
        race: number;
        name: string[];
    };
} {
    return {
        pathname: "/race/[race]/[[...name]]",
        params: {
            race: race.id,
            name: [race.name.replaceAll(" ", "_").toLowerCase()]
        }
    }
}

export function getRiders3YearRollingRankingsUrl(): Href {
    return {
        pathname: "/rankings/riders/3-year_period"
    };
}

export function getRidersListUrl(filter?: Partial<RidersFilter>): Href {
    const params = new URLSearchParams();

    if (filter) {
        if (filter.status) params.set("status", filter.status);
        if (filter.isSingleYear) params.set("isSingleYear", filter.isSingleYear.toString());
        if (filter.bornBeforeOrIn) params.set("bornBeforeOrIn", filter.bornBeforeOrIn.toString());
        if (filter.bornAfterOrIn) params.set("bornAfterOrIn", filter.bornAfterOrIn.toString());
        if (filter.nations) filter.nations.forEach(nation => nation && params.append("nations", nation.toString()))
    }

    const query = params.toString();

    return {
        pathname: "/rankings/riders",
        query: query
    }
}

export function deserializeQueryString(query?: string) {
    if (!query) return "";

    return query
        .replaceAll("%7C", "|")
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}