"use client";

import { type Drink, type Cafe } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Pencil,
  ChevronDownCircle,
  ChevronUpCircle,
  CupSoda,
  GlassWater,
  Milk,
  Beaker,
} from "lucide-react";
import DeleteAlert from "~/components/DeleteAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateDrinkForm from "~/components/CreateDrinkForm";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { useState, useEffect } from "react";

type DrinkCardProps = {
  canEdit: boolean;
  drink: Drink;
  cafe?: Cafe;
  score?: number;
  handleDrinkSelection?: (drink: Drink) => void;
};

export function DrinkCard(props: DrinkCardProps) {
  const { canEdit, drink, cafe, score, handleDrinkSelection } = props;
  const [isOpen, setIsOpen] = useState(false);
  const icons = [
    <CupSoda key="cup-soda" className="h-10 w-10" />,
    <GlassWater key="glass-water" className="h-10 w-10" />,
    <Milk key="milk" className="h-10 w-10" />,
    <Beaker key="beaker" className="h-10 w-10" />,
  ];

  const selectedIcon = icons[Math.floor(Math.random() * icons.length)];

  const onCardClick = () => {
    if (handleDrinkSelection) {
      handleDrinkSelection(drink);
    }
  };

  return (
    <div>
      {canEdit && (
        <Card key={drink.id} className="h-full">
          <CardHeader className="h-full">
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
                  {/* Cafe will be defined if canEdit is true */}
                  <CreateDrinkForm cafe={cafe!.id} drink={drink} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid h-full w-full grid-rows-3 justify-items-center space-y-2 text-center">
              <CardTitle>{drink.name}</CardTitle>
              <CardDescription>{drink.description}</CardDescription>
              <CardDescription>
                Price: {drink.price.toFixed(2)}{" "}
                <span className="font-semibold">/</span> Sweetness:{" "}
                {drink.sweetness}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
      {!canEdit && (
        <div className="mb-3">
          <Card
            key={drink.id}
            onClick={onCardClick}
            className={`${handleDrinkSelection ? "hover:cursor-pointer" : ""} h-full`}
          >
            <div className="max-w group relative mx-auto h-full cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <span className="absolute top-0 z-0 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
              </div>
              <CardHeader>
                <div className="grid w-full grid-cols-2 space-x-10">
                  <div className="grid w-full grid-cols-2 items-center justify-items-start space-y-2">
                    {selectedIcon}
                    <CardTitle>{drink.name}</CardTitle>
                  </div>
                  <CardContent className="grid w-full grid-rows-2 justify-items-center p-0 text-3xl">
                    <div className="self-end text-3xl font-semibold">
                      {score ? `${Math.round(score * 100)}%` : ""}
                    </div>
                    <div className="self-start text-xl">
                      {score ? "match" : ""}
                    </div>
                  </CardContent>
                </div>
              </CardHeader>
            </div>
          </Card>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="text-base font-semibold text-[#48742C]">
              <div className="flex items-center">
                {isOpen ? <ChevronUpCircle /> : <ChevronDownCircle />}
                <span className="pl-2">More Details</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardDescription>
                <span className="font-semibold">Recommendation Reason: </span>
                TBD
              </CardDescription>{" "}
              {/* to be reagent'd */}
              <CardDescription>
                <span className="font-semibold">Drink Description: </span>
                {drink.description}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Price: </span>
                {drink.price.toFixed(2)}{" "}
                <span className="font-semibold">/</span>{" "}
                <span className="font-semibold">Sweetness: </span>
                {drink.sweetness}
              </CardDescription>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
