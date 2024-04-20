import Link from "next/link";
import React from "react";
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

import { SearchBar } from "~/components/ui/searchBar";


const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center bg-[#F7F0DD] p-4 py-12 text-center text-black">
        <h2 className="text-center text-4xl">DISCOVER</h2>
      </div>
      <h3 className="text-itim items-center text-2xl">Locate your cafe:</h3>
      <div className="grid grid-cols-1">
      <SearchBar/>
      </div>
      <h3 className="pb-1 pt-5 text-2xl">Recent Drink Choices</h3>
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
