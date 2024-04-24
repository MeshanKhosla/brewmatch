import type { Cafe, Drink } from "@prisma/client";
import CreateDrink from "~/components/CreateDrink";
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
import { DrinkCard } from "~/components/DrinkCard";

type CafeOwnerProps = {
  cafe: Cafe;
  myDrinks: Drink[];
};

const CafeOwner = (props: CafeOwnerProps) => {
  const { cafe, myDrinks } = props;

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
          <DrinkCard
          key={drink.id}
          drink={drink}
          cafe={cafe}
          canEdit={true}
        />
        ))}
      </div>
      <CreateDrink cafeId={cafe.id} />
    </div>
  );
};

export default CafeOwner;
