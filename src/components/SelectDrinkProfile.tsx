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
      <h1 className="text-2xl font-semibold mb-4">Select Drink Profile</h1>
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
