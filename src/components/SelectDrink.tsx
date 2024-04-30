import type { DrinkRecommendation } from "~/components/CafeCustomer";
import { DrinkCard } from "./DrinkCard";
import { type Drink, type DrinkProfile } from "@prisma/client";
import { LoadingCards } from "~/components/LoadingCards";

type SelectDrinkProps = {
  drinkProfile: DrinkProfile;
  drinkRecommendations: DrinkRecommendation[];
  recommendationReasons: string[];
  handleDrinkSelection: (drink: Drink) => void;
};

const SelectDrink = (props: SelectDrinkProps) => {
  const { drinkRecommendations, recommendationReasons, handleDrinkSelection } =
    props;
  if (drinkRecommendations.length === 0 || recommendationReasons.length === 0) {
    return (
      <div>
        <div className="mb-4 text-3xl font-bold">Top 3 Recommendations</div>
        <p className="mb-2 text-center font-light text-gray-500 transition-all duration-300">
          Brewing up some recommendations for you...
        </p>
        <LoadingCards cafe={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-4 text-2xl font-semibold">Top 3 Recommendations</h1>
      <div className="cols-1 md:rows-3 mb-5">
        {recommendationReasons &&
          drinkRecommendations.map((drink, index) => (
            <DrinkCard
              key={drink.drink.id}
              drink={drink.drink}
              score={drink.score}
              reason={recommendationReasons[index]}
              canEdit={false}
              handleDrinkSelection={handleDrinkSelection}
            />
          ))}
      </div>
    </div>
  );
};

export default SelectDrink;
