"use client";

import React from "react";
import { Tables } from "@/lib/supabase/database.types";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import { Item, ItemGroup } from "./ui/item";
import Link from "next/link";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SearchRiders({
    riders,
}: Readonly<{
    riders: Tables<"riders">[],
}>) {
    const router = useRouter();

    const handleClick = (rider: Tables<"riders">) => {
        router.push(`/dashboard/twitter-images/${rider.id}`);
    };

    return (
        <div className="flex flex-col gap-2">
            <InputGroup>
                <InputGroupInput placeholder="Søg efter ryttere..." />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
            </InputGroup>
            <Card className="gap-1 p-3">
                {riders.slice(0, 10).map((rider, index) => (
                    <React.Fragment key={rider.id}>
                        <Button
                            key={rider.id}
                            variant="ghost"
                            className="justify-start w-full text-left"
                            onClick={() => handleClick(rider)}
                        >
                            {rider.first_name} {rider.last_name}
                        </Button>
                        {index < 9 && <Separator />}
                    </React.Fragment>
                ))}
            </Card>
        </div>
    );
}