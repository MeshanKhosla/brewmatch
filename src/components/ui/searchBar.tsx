'use client';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "~/components/ui/command";

import { useState } from "react";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';


export function SearchBar() {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    return (<Command className="">
            <CommandInput placeholder="Search a Cafe..." onSelect={() => setOpen(true)}/>
            {open && <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Philz</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Cafes">
                    <CommandItem onSelect={(value) => router.push("/cafe/SoDoI")}>SoDoI</CommandItem>
                    <CommandItem onSelect={(value) => router.push("/cafe/Blue%20Bottle")}>Blue Bottle</CommandItem>
                </CommandGroup>
            </CommandList>}
        </Command>);
    }