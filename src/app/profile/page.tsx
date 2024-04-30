import Link from "next/link";
import { getServerSession } from "next-auth";
import CardHover from "~/components/CardHover";
import CreateDrinkProfile from "~/components/CreateDrinkProfile";
import { DrinkProfileCard } from "~/components/DrinkProfileCard";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { getDrinkProfilesByCreator, getOrdersByCreator } from "~/queries";
import { authOptions } from "~/server/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <h1 className="text-2xl font-semibold">Sign in to view your profile!</h1>
    );
  }

  const myDrinkProfiles = await getDrinkProfilesByCreator(session.user.id);
  const orders = await getOrdersByCreator(session.user.id);

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h1 className="text-4xl font-semibold">Your Drink Profiles</h1>
      {myDrinkProfiles.length === 0 ? (
        <p>You don&apos;t have any drink profiles yet. Create one below!</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-2">
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
      <h2 className="text-4xl font-semibold">Order History</h2>
      <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-2">
          {orders.map((order) => (
            <Link href={`/cafe/${order.drink.cafe.name}`} key={order.drink.cafe.id}>
                  <Card key={order.id} className="h-full">
                    <div className="max-w group relative mx-auto h-full cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <CardHover />
                      <CardHeader className="h-full">
                        <div className="grid h-full grid-rows-[max-content_1fr]">
                          <CardTitle className="font-semibold">{order.drink.name}</CardTitle>
                          <CardTitle className="text-lg font-normal">{order.drink.cafe.name}</CardTitle> 
                          <CardDescription>{`ordered on: ${
                            new Date(order.createdAt).toLocaleDateString()
                          }`}</CardDescription>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default Page;
