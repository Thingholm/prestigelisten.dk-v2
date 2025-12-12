import { RidersFilter } from "@/app/[lang]/rankings/riders/_sections/ListSection";

export function filterToSearchParamsMapper(filter: RidersFilter, defaultFilter: RidersFilter) {
    const params = new URLSearchParams();

    if (filter.status != defaultFilter.status) params.set("status", filter.status);
    
    if (filter.isSingleYear != defaultFilter.isSingleYear) params.set("isSingleYear", filter.isSingleYear.toString());

    if (filter.bornBeforeOrIn != defaultFilter.bornBeforeOrIn) params.set("bornBeforeOrIn", filter.bornBeforeOrIn.toString());
    
    if (filter.bornAfterOrIn != defaultFilter.bornAfterOrIn) params.set("bornAfterOrIn", filter.bornAfterOrIn.toString());

    if (JSON.stringify(defaultFilter.nations) != JSON.stringify(filter.nations)) {
        const nations = filter.nations.filter(nation => nation) as number[]
        if (nations.length > 0) {
            params.set("nations", nations.join(","))
        }
    }

    return params
}

export function searchParamsToFilterMapper(searchParams: URLSearchParams, defaultFilter: RidersFilter) {
    const newFilter = { ...defaultFilter }

    const status = searchParams.get("status")
    if (status && ['all', 'active', 'inactive'].includes(status)) {
        newFilter.status = status as RidersFilter["status"]
    }

    const isSingleYear = searchParams.get('isSingleYear')
    if (isSingleYear != null) {
        newFilter.isSingleYear = isSingleYear == 'true'
    }

    const bornBeforeOrIn = searchParams.get('bornBeforeOrIn')
    if (bornBeforeOrIn) {
        const year = parseInt(bornBeforeOrIn)
        if (!isNaN(year)) {
            newFilter.bornBeforeOrIn = year
        }
    }
    
    const bornAfterOrIn = searchParams.get('bornAfterOrIn')
    if (bornAfterOrIn) {
        const year = parseInt(bornAfterOrIn)
        if (!isNaN(year)) {
            newFilter.bornAfterOrIn = year
        }
    }

    const nations = searchParams.get("nations")
    if (nations != null && nations != "") {
        newFilter.nations = nations.split(",").map(id => parseInt(id)).filter(id => !isNaN(id));
    }

    return newFilter;
}