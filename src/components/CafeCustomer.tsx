"use client";

import { useState } from "react";
import { type DrinkProfile, type Cafe, type Drink } from "@prisma/client";
import { SelectDrinkProfile } from "~/components/SelectDrinkProfile";
import { Button } from "~/components/ui/button";
import { getDrinkRecommendations } from "~/actions";
import { toast } from "sonner";
import SelectDrink from "~/components/SelectDrink";

type CafeCustomerProps = {
  cafe: Cafe;
  drinkProfiles: DrinkProfile[];
};

export type DrinkRecommendation = {
  drink: Drink;
  score: number;
};

const STEPS = ["SELECT_DRINK_PROFILE", "SELECT_DRINK", "REVIEW_DRINK"] as const;

const CafeCustomer = (props: CafeCustomerProps) => {
  const { cafe, drinkProfiles } = props;
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [reccommendedDrinks, setReccommendedDrinks] = useState<
    DrinkRecommendation[]
  >([]);
  // const [drinkProfileSelection, setDrinkProfileSelection] =
  //   useState<DrinkProfile>();

  const incrementStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const decrementStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleProfileSelection = async (profile: DrinkProfile) => {
    // setDrinkProfileSelection(profile);
    incrementStep();
    const reccommendedDrinks = await getDrinkRecommendations(
      profile,
      cafe.id,
      3,
    );

    if (reccommendedDrinks.ok) {
      setReccommendedDrinks(reccommendedDrinks.drinks as DrinkRecommendation[]);
    } else {
      toast.error("Error getting drink recommendations. Please try again");
    }

    console.log(reccommendedDrinks);
  };

  const STEPS_TO_COMPONENTS: Record<(typeof STEPS)[number], JSX.Element> = {
    SELECT_DRINK_PROFILE: (
      <SelectDrinkProfile
        drinkProfiles={drinkProfiles}
        handleProfileSelection={handleProfileSelection}
      />
    ),
    SELECT_DRINK: <SelectDrink drinkRecommendations={reccommendedDrinks} />,
    REVIEW_DRINK: <div>Review Drink</div>,
  };

  return (
    <div>
      {STEPS_TO_COMPONENTS[STEPS[stepIndex]!]}
      <Button disabled={stepIndex === 0} onClick={decrementStep}>
        Previous
      </Button>
    </div>
  );
};

export default CafeCustomer;
