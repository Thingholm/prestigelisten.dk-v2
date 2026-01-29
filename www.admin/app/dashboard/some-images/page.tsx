import SearchRiders from "@/components/search-riders";
import { getRiders } from "@/lib/db/riders";

export default async function Page() {
    const riders = await getRiders();

    return (
        <div>
            <SearchRiders riders={riders} />
        </div>
    );
}