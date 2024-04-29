import type { DrinkRecommendation } from "~/components/CafeCustomer";
import { DrinkCard } from "./DrinkCard";
import { type Drink, type DrinkProfile } from "@prisma/client";
import { LoadingCards } from "~/components/LoadingCards";

type SelectDrinkProps = {
  drinkProfile: DrinkProfile;
  drinkRecommendations: DrinkRecommendation[];
  handleDrinkSelection: (drink: Drink) => void;
};

const SelectDrink = (props: SelectDrinkProps) => {
  const { drinkRecommendations, handleDrinkSelection } = props;
  if (drinkRecommendations.length === 0) {
    return (
      <div>
        <div className="mb-4 text-3xl font-bold">Top 3 Recommendations</div>
        <LoadingCards cafe={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold mb-4">Top 3 Recommendations</h1>
      <div className="cols-1 md:rows-3 mb-5">
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
