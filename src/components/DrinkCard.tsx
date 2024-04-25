"use client";

import { type Drink, type Cafe } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Pencil } from "lucide-react";
import DeleteAlert from "~/components/DeleteAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateDrinkForm from "~/components/CreateDrinkForm";

type DrinkCardProps = {
  canEdit: boolean;
  drink: Drink;
  cafe?: Cafe;
  score?: number;
  handleDrinkSelection?: (drink: Drink) => void;
};

export function DrinkCard(props: DrinkCardProps) {
  const { canEdit, drink, cafe, score, handleDrinkSelection } = props;

  const onCardClick = () => {
    if (handleDrinkSelection) {
      handleDrinkSelection(drink);
    }
  };

  return (
    <Card
      key={drink.id}
      onClick={onCardClick}
      className={handleDrinkSelection ? "hover:cursor-pointer" : ""}
    >
    <div
      className="group relative cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mx-auto max-w rounded-lg">
      <span className="absolute top-0 z-0 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
      <div className="relative z-10 mx-auto max-w-md">
          <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
      <CardHeader>
        {canEdit && (
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
        )}
        <div className="grid w-full grid-rows-3 justify-items-center space-y-2">
          <CardTitle>{drink.name}</CardTitle>
          <CardDescription>{drink.description}</CardDescription>
          <CardDescription>
            Price: {drink.price} <span className="font-semibold">/</span>{" "}
            Sweetness: {drink.sweetness}
          </CardDescription>
        </div>
        <CardContent></CardContent>
      </CardHeader>
      </div>
      </div>
    </Card>
  );
}
