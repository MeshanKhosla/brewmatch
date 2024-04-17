import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Page = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center bg-[#F7F0DD] p-4 py-12 text-center text-black">
        <h2 className="text-center text-4xl">DISCOVER</h2>
      </div>
      <h2 className="items-center pb-12 pt-8 text-center text-3xl">
        Decision Making Made Easy with BrewMatch!
      </h2>
      <h3 className="text-itim items-center text-2xl">Locate your cafe!</h3>
      <Command>
        <CommandInput placeholder="Search a Cafe..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Philz</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Cafes">
            <CommandItem>SoDoI</CommandItem>
            <CommandItem>Mind Cafe</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex flex-col gap-2 md:flex-row">
        <h3 className="text-xl md:text-2xl">
          Feeling inspired? Add a new drink profile!
        </h3>
        <Link href="/profile">
          <Button className="w-full justify-center rounded bg-[#8fbc5c] text-3xl font-bold text-white hover:bg-[#719646] md:h-8 md:items-center md:p-2 md:pb-3">
            +
          </Button>
        </Link>
      </div>
      <h3 className="py-5 text-center text-2xl">Recent Drink Choices</h3>
      <Link href="/cafe/Blue%20Bottle">
        <Card>
          <CardHeader>
            <CardTitle>Blue Bottle</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Drink Profile: MATCHA MADE IN HEAVEN</p>
            <p>Order: Iced Matcha Latte</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Page;
