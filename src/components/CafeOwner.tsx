import { Cafe, Drink } from "@prisma/client";
import CreateDrink from "~/components/CreateDrink";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Pencil } from 'lucide-react';
import DeleteAlert from "~/components/DeleteAlert";
import CreateDrinkForm from "~/components/CreateDrinkForm";

type CafeOwnerProps = {
  cafe: Cafe;
  myDrinks: Drink[];
}

const CafeOwner = (props: CafeOwnerProps) => {
  const { cafe, myDrinks } = props;

  if (myDrinks.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Menu</h1>
        <p>{cafe.name} doesn&apos;t have any drinks yet. Add some below!</p>
        <CreateDrink cafeId={cafe.id} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Menu</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {myDrinks.map((drink) => (
          <Card key={drink.id}>
            <CardHeader>
              <div className="flex justify-between items-center w-full size-1 space-x-2">
                <DeleteAlert drink={drink} />
                <Dialog>
                  <DialogTrigger>
                    <Pencil />
                  </DialogTrigger>
                  <DialogContent className="my-3 max-h-screen overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <CreateDrinkForm cafe={cafe.id} drink={drink} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-rows-3 justify-items-center w-full space-y-2">
                <CardTitle>{drink.name}</CardTitle>
                <CardDescription>{drink.description}</CardDescription>
                <CardDescription>Price: {drink.price} / Sweetness: {drink.sweetness}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <CreateDrink cafeId={cafe.id} />
    </div>
  )
}

export default CafeOwner