import { DrinkProfileCard } from "./DrinkProfileCard";
import { type DrinkProfile } from "@prisma/client";

type DrinkProfileProps = {
  drinkProfiles: DrinkProfile[];
  handleProfileSelection: (profile: DrinkProfile) => void;
};

export function SelectDrinkProfile(props: DrinkProfileProps) {
  const { drinkProfiles, handleProfileSelection } = props;

  return (
    <div className="flex flex-col gap-2">
      {/* <h2 className="text-xl font-semibold">
        Step 1: Choose your Drink Profile
      </h2> */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {drinkProfiles.map((profile) => (
          <DrinkProfileCard
            key={profile.id}
            profile={profile}
            canEdit={false}
            handleProfileSelection={handleProfileSelection}
          />
        ))}
      </div>
    </div>
  );
}
