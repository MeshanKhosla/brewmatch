import type { DrinkRecommendation } from "~/components/CafeCustomer";
import { DrinkCard } from "./DrinkCard";
import { type Drink } from "@prisma/client";
import { LoadingCards } from "~/components/LoadingCards";

type SelectDrinkProps = {
  drinkRecommendations: DrinkRecommendation[];
  handleDrinkSelection: (drink: Drink) => void;
};

const SelectDrink = (props: SelectDrinkProps) => {
  const { drinkRecommendations, handleDrinkSelection } = props;
  if (drinkRecommendations.length === 0) {
    return <LoadingCards />
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">
        Step 2: Choose a Recommended Drink
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {drinkRecommendations.map((drink) => (
          <DrinkCard
            key={drink.drink.id}
            drink={drink.drink}
            score={drink.score}
            canEdit={false}
            handleDrinkSelection={handleDrinkSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectDrink;
