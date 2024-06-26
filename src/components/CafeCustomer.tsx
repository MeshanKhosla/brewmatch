"use client";

import { useState } from "react";
import { type DrinkProfile, type Cafe, type Drink } from "@prisma/client";
import { SelectDrinkProfile } from "~/components/SelectDrinkProfile";
import {
  createOrder,
  getDrinkRecommendations,
  getDrinkRecommendationReasoning,
} from "~/actions";
import { toast } from "sonner";
import SelectDrink from "~/components/SelectDrink";
import { ProgressBar } from "~/components/ProgressBar";
import { CircleArrowLeftIcon } from "lucide-react";
import ReviewDrink from "~/components/ReviewDrink";

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
  const [selectedProfile, setSelectedProfile] = useState<DrinkProfile>();
  const [reccommendedDrinks, setReccommendedDrinks] = useState<
    DrinkRecommendation[]
  >([]);
  const [recommendationReasons, setRecommendationReasons] = useState<string[]>(
    [],
  );
  const [selectedDrink, setSelectedDrink] = useState<Drink>();

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
    incrementStep();
    setSelectedProfile(profile);
    const reccommendedDrinks = await getDrinkRecommendations(
      profile,
      cafe.id,
      3,
    );

    if (reccommendedDrinks.ok) {
      setReccommendedDrinks(reccommendedDrinks.drinks as DrinkRecommendation[]);
      const drinkRecList = reccommendedDrinks.drinks.map(
        (drink) => drink.drink,
      );
      await reasonGeneration(profile, drinkRecList);
    } else {
      toast.error("Error getting drink recommendations. Please try again");
    }
  };

  const reasonGeneration = async (profile: DrinkProfile, drinks: Drink[]) => {
    const recommendationReasons = await getDrinkRecommendationReasoning(
      profile,
      drinks,
    );

    if (recommendationReasons.ok && recommendationReasons.recommendations) {
      setRecommendationReasons(recommendationReasons.recommendations);
    } else {
      toast.error("Error getting recommendation reasons. Please try again");
    }
  };

  const handleDrinkSelection = async (drink: Drink) => {
    incrementStep();
    setSelectedDrink(drink);
    const res = await createOrder(drink.id);
    if (!res.ok) {
      toast.error("Error creating order. Please try again");
    }
  };

  const STEPS_TO_COMPONENTS: Record<(typeof STEPS)[number], JSX.Element> = {
    SELECT_DRINK_PROFILE: (
      <SelectDrinkProfile
        drinkProfiles={drinkProfiles}
        handleProfileSelection={handleProfileSelection}
      />
    ),
    SELECT_DRINK: (
      <>
        {selectedProfile && (
          <SelectDrink
            drinkProfile={selectedProfile}
            drinkRecommendations={reccommendedDrinks}
            recommendationReasons={recommendationReasons}
            handleDrinkSelection={handleDrinkSelection}
          />
        )}
      </>
    ),
    REVIEW_DRINK: <>{selectedDrink && <ReviewDrink drink={selectedDrink} />}</>,
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        {stepIndex !== 0 && (
          <CircleArrowLeftIcon
            className="mb-4 cursor-pointer"
            size={30}
            onClick={decrementStep}
          />
        )}
        <ProgressBar currentStep={stepIndex} />
        {STEPS_TO_COMPONENTS[STEPS[stepIndex]!]}
      </div>
    </div>
  );
};

export default CafeCustomer;
