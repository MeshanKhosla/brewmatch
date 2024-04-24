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
      <CreateDrink cafeId={cafe.id} />
    </div>
  );
};

export default CafeOwner;
