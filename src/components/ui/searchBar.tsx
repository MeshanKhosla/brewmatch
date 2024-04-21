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
import Select from 'react-select'
import { getAllCafes } from "~/queries";


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

export function SearchBarReact(cafes:Array<any>) {
    const router = useRouter();
    const options = [
        { value: 'SoDoI', label: 'SoDoI' },
        { value: 'Blue Bottle', label: 'Blue Bottle' },
      ]
      {cafes.map((cafes) => (
        options.push({value: cafes.name, label: cafes.name})
      ))}

    return <Select theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#8fbc5c',
          primary: '#8fbc5c',
        }})} options={options} onChange={(option) => router.push(`/cafe/${option.value}`)}/>
}