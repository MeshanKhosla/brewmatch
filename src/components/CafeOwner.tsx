"use client";

import type { Cafe, Drink } from "@prisma/client";
import CreateDrink from "~/components/CreateDrink";
import CreateDrinkCSV from "~/components/CreateDrinkCSV";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Pencil } from "lucide-react";
import DeleteAlert from "~/components/DeleteAlert";
import CreateDrinkForm from "~/components/CreateDrinkForm";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useState } from "react";

type CafeOwnerProps = {
  cafe: Cafe;
  myDrinks: Drink[];
};

const CafeOwner = (props: CafeOwnerProps) => {
  const { cafe, myDrinks } = props;

  const [selectedOption, setSelectedOption] = useState("single");

  if (myDrinks.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Menu</h1>
        <p>{cafe.name} doesn&apos;t have any drinks yet. Add some below!</p>
        <CreateDrink cafeId={cafe.id} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pb-10">
      <h1 className="text-2xl font-semibold">Menu</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {myDrinks.map((drink) => (
          <Card key={drink.id}>
            <CardHeader>
              <div className="flex size-1 w-full items-center justify-between space-x-2 pb-5">
                <DeleteAlert drink={drink} />
                <Dialog>
                  <DialogTrigger>
                    <Pencil />
                  </DialogTrigger>
                  <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <CreateDrinkForm cafe={cafe.id} drink={drink} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid w-full grid-rows-3 justify-items-center space-y-2">
                <CardTitle>{drink.name}</CardTitle>
                <CardDescription>{drink.description}</CardDescription>
                <CardDescription>
                  Price: {drink.price} <span className="font-semibold">/</span>{" "}
                  Sweetness: {drink.sweetness}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <RadioGroup
        className="grid grid-cols-2 pt-8"
        defaultValue="single"
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="single"
            id="single"
            style={{ color: "#8fbc5c" }}
          />
          <Label
            htmlFor="single"
            className={"single" === selectedOption ? "font-bold" : ""}
          >
            Single Form
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="csv" id="csv" style={{ color: "#8fbc5c" }} />
          <Label
            htmlFor="csv"
            className={"csv" === selectedOption ? "font-bold" : ""}
          >
            CSV Import
          </Label>
        </div>
      </RadioGroup>
      {selectedOption === "single" && <CreateDrink cafeId={cafe.id} />}
      {selectedOption === "csv" && <CreateDrinkCSV cafeId={cafe.id} />}
    </div>
  );
};

export default CafeOwner;
