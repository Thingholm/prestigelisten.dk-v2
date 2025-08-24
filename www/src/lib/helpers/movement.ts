export function getMovement(currentRank: number, prevRank: number) {
    if (currentRank == prevRank) return "none";

    if (currentRank > prevRank) return "down";

    return "up";
}