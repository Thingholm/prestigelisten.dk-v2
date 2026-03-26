type Rider = {
    first_name: string | null;
    last_name: string;
}

export function getRiderName(rider: Rider) {
    return `${rider.first_name ? `${rider.first_name} ` : ``}${rider.last_name}`;
}