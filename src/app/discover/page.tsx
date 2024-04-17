import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

const Page = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="flex items-center justify-center bg-[#F7F0DD] text-black p-4 text-center py-12">
        <h2 className="text-4xl text-center">DISCOVER</h2>
      </div>
      <h2 className="items-center text-center text-3xl pt-8 pb-12">Decision Making Made Easy with BrewMatch!</h2>
      <h3 className="items-center text-2xl text-itim">Locate your cafe!</h3>
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
      <div className='flex flex-col md:flex-row gap-2'>
        <h3 className='text-xl md:text-2xl'>Feeling inspired? Add a new drink profile!</h3>
        <Link href="/profile">
          <Button className="bg-[#8fbc5c] hover:bg-[#719646] text-white font-bold rounded text-3xl w-full md:h-8 md:p-2 md:pb-3 md:items-center justify-center">+</Button>
        </Link>
      </div>
      <h3 className='text-2xl text-center py-5'>Recent Drink Choices</h3>
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
  )
}

export default Page