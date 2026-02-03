import ContentWrapper from "@/components/social-media-images/ContentWrapper";
import { getPointSystem } from "@/lib/db/point-system";
import { getResultsThisYear, ResultWithRaceDate } from "@/lib/db/results";
import { getRiderById, getRiders, Rider } from "@/lib/db/riders";
import { Tables } from "@/lib/supabase/database.types";

type Result = {
    result_type: number;
    races: {
        race_class_id: number;
        meta_race_id: number;
    },
    placement?: number | null;
}

type GroupedByKey<T, K> = {
    key: K;
    results: (T & { points: number })[];
    points: number;
};

type Ranked<T> = T & { rank: number | null };

export type RankingEvolution = {
    results: GroupedByKey<ResultWithRaceDate & {
        points: number;
    }, number>[];
    rankings: Ranked<Tables<"riders">>[];
    prevRankings: Ranked<Tables<"riders">>[] | null;
    key: string | undefined;
    points: number;
}

function rankBy<T>(items: T[], key: keyof T, direction: "asc" | "desc" = "desc"): Ranked<T>[] {
    const sortedItems = [...items].sort((a, b) => {
        const aVal = a[key] as number;
        const bVal = b[key] as number;
        return direction === 'desc' ? bVal - aVal : aVal - bVal;
    });

    let rank = 1;
    return sortedItems.map((item, index) => {
        if (item[key] == null || item[key] === 0) {
            return { ...item, rank: null };
        }

        if (index > 0 && sortedItems[index - 1][key] !== item[key]) {
            rank = index + 1;
        }
        return { ...item, rank: rank };
  });
}

function getResultPoints(result: Result, pointSystem: Tables<"point_system">[]) {
    return pointSystem.find(i => 
        i.result_type == result.result_type 
        && i.race_class_id == result.races.race_class_id
    )?.points ?? 0;
}

function getResultsWithPoints<T extends Result>(results: T[], pointSystem: Tables<"point_system">[]): (T & { points: number })[] {
    return results.map(r => ({
        ...r,
        points: getResultPoints(r, pointSystem)
    }))
}

function groupResultsByKey<T extends Result, K>(results: T[], pointSystem: Tables<"point_system">[], keySelector: (result: T) => K): GroupedByKey<T, K>[] {
    const resultsWithPoints = getResultsWithPoints(results, pointSystem);

    const groupsMap = new Map<string, GroupedByKey<T, K>>();

    for (const result of resultsWithPoints) {
        const rawKey = keySelector(result);
        const keyString = typeof rawKey === "object" ? JSON.stringify(rawKey) : String(rawKey);

        if (!groupsMap.has(keyString)) {
        groupsMap.set(keyString, {
            key: rawKey,
            results: [],
            points: 0,
        });
        }

        const group = groupsMap.get(keyString)!;
        group.results.push(result);
        group.points += result.points;
    }

    return Array.from(groupsMap.values());
}

function calculateRankingEvolution(results: ResultWithRaceDate[], riderPoints: Tables<"riders">[], pointSystem: Tables<"point_system">[]): RankingEvolution[] {
    const groupedResultsByDate = groupResultsByKey(results, pointSystem, r => r.race_dates?.date ?? "other").sort((a, b) => Date.parse(b.key ?? "") - Date.parse(a.key ?? ""));

    let prevRankings: Ranked<Tables<"riders">>[] | null;
    const rankingsByDate = groupedResultsByDate.map(group => {
        const groupedByRider = groupResultsByKey(group.results, pointSystem, r => r.rider_id);

        if (!prevRankings) {
            prevRankings = rankBy(riderPoints, "points");
        }

        const newRankings = prevRankings;

        prevRankings = JSON.parse(JSON.stringify(rankBy(prevRankings.map(rp => ({
            ...rp,
            points: rp.points - (groupedByRider.find(riderGroup => riderGroup.key == rp.id)?.points ?? 0)
        })), "points")))

        return {
            ...group,
            results: groupedByRider.sort((a, b) => b.points - a.points),
            rankings: newRankings,
            prevRankings: prevRankings
        }
    })

    return rankingsByDate
}

export default async function Page({
    params,
}: Readonly<{ params: { id: number } }>) {
    const { id } = await params;

    const [
        rider,
        results,
        riderPoints,
        pointSystem,
    ] = await Promise.all([
        getRiderById(id),
        getResultsThisYear(),
        getRiders(),
        getPointSystem()
    ])
    const rankingsByDate = rider.active && rider.results.some((result: Rider["results"]) => result.year == new Date().getFullYear()) ? calculateRankingEvolution(results, riderPoints, pointSystem) : null;


    return (
        <div>
            {id}
            <ContentWrapper
                rankingEvolutions={rankingsByDate}
                rider={rider}
                riderPoints={riderPoints}
                pointSystem={pointSystem}
            />
        </div>
    );
}