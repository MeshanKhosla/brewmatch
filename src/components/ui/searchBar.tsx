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
import { useRouter } from 'next/navigation';
import Select from 'react-select'
import { Cafe } from "@prisma/client";



export function SearchBar() {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    // console.log(getAllCafes());
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
type SearchBarProps = {
    cafes: Cafe[]
};
export function SearchBarReact(props: SearchBarProps) {
    const {cafes} = props;
    
    const router = useRouter();
    const options = cafes.map((cafes) => ({value: cafes.name, label: cafes.name}));
    return <Select theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#8fbc5c',
          primary: '#8fbc5c',
        }})} options={options} onChange={(option) => router.push(`/cafe/${option!.value}`)}/>
}