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
  Beaker
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
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState, useEffect } from 'react';

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
  const icons = [<CupSoda className="w-10 h-10" />,
  <GlassWater className="w-10 h-10" />,
  <Milk className="w-10 h-10" />,
  <Beaker className="w-10 h-10" />];
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  const selectRandomIcon = () => {
    const icon = icons[Math.floor(Math.random() * 4)];
    setSelectedIcon(icon);
  };

  useEffect(() => {
    selectRandomIcon();
  }, []);

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
            <div className="grid w-full h-full grid-rows-3 justify-items-center space-y-2 text-center">
              <CardTitle>{drink.name}</CardTitle>
              <CardDescription>{drink.description}</CardDescription>
              <CardDescription>
                Price: {drink.price.toFixed(2)} <span className="font-semibold">/</span>{" "}
                Sweetness: {drink.sweetness}
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
            <div
              className="h-full group relative cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mx-auto max-w rounded-lg">
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
                  <CardContent className="grid w-full p-0 grid-rows-2 justify-items-center text-3xl">
                    <div className="text-3xl font-semibold self-end">{score ? `${Math.round(score * 100)}%` : ""}</div>
                    <div className="text-xl self-start">{score ? "match" : ""}</div>
                  </CardContent>
                </div>
              </CardHeader>
            </div>
          </Card>
          <Collapsible open={isOpen}
            onOpenChange={setIsOpen} >
            <CollapsibleTrigger className="text-[#48742C] font-semibold text-base">
              <div className="flex items-center">
                {isOpen ? <ChevronUpCircle /> : <ChevronDownCircle />}
                <span className="pl-2">More Details</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardDescription><span className="font-semibold">Recommendation Reason: </span>TBD</CardDescription> {/* to be reagent'd */}
              <CardDescription><span className="font-semibold">Drink Description: </span>{drink.description}</CardDescription>
              <CardDescription>
                <span className="font-semibold">Price: </span>{drink.price.toFixed(2)} <span className="font-semibold">/</span>{" "}
                <span className="font-semibold">Sweetness: </span>{drink.sweetness}
              </CardDescription>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
