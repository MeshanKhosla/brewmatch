import type { DrinkRecommendation } from "~/components/CafeCustomer";
import { DrinkCard } from "./DrinkCard";
import { type Drink, type DrinkProfile } from "@prisma/client";
import { LoadingCards } from "~/components/LoadingCards";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type SelectDrinkProps = {
  drinkProfile: DrinkProfile;
  drinkRecommendations: DrinkRecommendation[];
  handleDrinkSelection: (drink: Drink) => void;
};

const SelectDrink = (props: SelectDrinkProps) => {
  const { drinkProfile, drinkRecommendations, handleDrinkSelection } = props;
  if (drinkRecommendations.length === 0) {
    return <LoadingCards />;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* <h2 className="text-xl font-semibold">
        Step 2: Choose a Recommended Drink
      </h2> */}
      <div>
        <Card className="bg-[#D5E7B8] mb-5 text-center -p-1">
          <CardHeader>
            <CardTitle>
              {drinkProfile.name}
            </CardTitle>
            <div className="bg-white p-3 rounded-md">
              <CardDescription>
                {drinkProfile.naturalLanguageInput}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="text-3xl font-bold mb-3 text-center">Top 3 Recommendations</div>
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
