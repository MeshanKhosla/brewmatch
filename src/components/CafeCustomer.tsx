"use client";

import { useState } from "react";
import { type DrinkProfile, type Cafe } from "@prisma/client";
import { SelectDrinkProfile } from "~/components/SelectDrinkProfile";
import { Button } from "~/components/ui/button";

type CafeCustomerProps = {
  cafe: Cafe;
  drinkProfiles: DrinkProfile[];
};

const STEPS = ["SELECT_DRINK_PROFILE", "SELECT_DRINK", "REVIEW_DRINK"] as const;

const CafeCustomer = (props: CafeCustomerProps) => {
  const { cafe, drinkProfiles } = props;
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [drinkProfileSelection, setDrinkProfileSelection] =
    useState<DrinkProfile>();

  console.log("Will remove this", cafe, drinkProfileSelection);
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

  const handleProfileSelection = (profile: DrinkProfile) => {
    setDrinkProfileSelection(profile);
    incrementStep();
  };

  const STEPS_TO_COMPONENTS: Record<(typeof STEPS)[number], JSX.Element> = {
    SELECT_DRINK_PROFILE: (
      <SelectDrinkProfile
        drinkProfiles={drinkProfiles}
        handleProfileSelection={handleProfileSelection}
      />
    ),
    SELECT_DRINK: <div>Select Drink</div>,
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
