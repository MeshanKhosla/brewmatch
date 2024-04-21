import { type Cafe } from "@prisma/client";
import { type Session } from "next-auth";
import { getDrinkProfilesByCreator } from "~/queries";
import { DrinkProfileCard } from "~/components/DrinkProfileCard";

type CafeCustomerProps = {
  cafe: Cafe;
  session: Session;
};

const CafeCustomer = async (props: CafeCustomerProps) => {
  const { cafe, session } = props;

  const drinkProfiles = await getDrinkProfilesByCreator(session.user.id);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">
        Step 1: Choose your Drink Profile
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {drinkProfiles.map((profile) => (
          <DrinkProfileCard
            key={profile.id}
            profile={profile}
            canEdit={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CafeCustomer;
