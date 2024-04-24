import type { DrinkRecommendation } from "~/components/CafeCustomer";

type SelectDrinkProps = {
  drinkRecommendations: DrinkRecommendation[];
};

const SelectDrink = (props: SelectDrinkProps) => {
  const { drinkRecommendations } = props;

  return <div>{JSON.stringify(drinkRecommendations)}</div>;
};

export default SelectDrink;
