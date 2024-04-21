import { getServerSession } from "next-auth";
import CreateDrinkProfile from "~/components/CreateDrinkProfile";
import { DrinkProfileCard } from "~/components/DrinkProfileCard";
import { getDrinkProfilesByCreator } from "~/queries";
import { authOptions } from "~/server/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <h1 className="text-2xl font-semibold">Sign in to view your profile!</h1>
    );
  }

  const myDrinkProfiles = await getDrinkProfilesByCreator(session.user.id);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Your Drink Profiles</h1>
      {myDrinkProfiles.length === 0 ? (
        <p>You don&apos;t have any drink profiles yet. Create one below!</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {myDrinkProfiles.map((profile) => (
            <DrinkProfileCard
              key={profile.id}
              profile={profile}
              canEdit={true}
            />
          ))}
        </div>
      )}
      <CreateDrinkProfile />
    </div>
  );
};

export default Page;
