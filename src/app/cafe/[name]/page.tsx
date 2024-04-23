import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CafeCustomer from "~/components/CafeCustomer";
import CafeOwner from "~/components/CafeOwner";
import {
  getCafeByName,
  getDrinkProfilesByCreator,
  getDrinksByCafe,
} from "~/queries";
import { authOptions } from "~/server/auth";
import { Pencil } from "lucide-react";
import DeleteAlert from "~/components/DeleteAlert";

const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  const cafe = await getCafeByName(decodedName);
  if (!cafe) {
    redirect("/discover");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <h1 className="text-2xl font-semibold">Sign in to view {cafe.name}</h1>
    );
  }

  const myDrinks = await getDrinksByCafe(cafe.id);
  const drinkProfiles = await getDrinkProfilesByCreator(session.user.id);

  const isUserOwner = session.user.id === cafe.userId;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center justify-center gap-3 bg-[#F7F0DD] p-4 py-8 text-center text-black">
        {isUserOwner ? (
          <div className="flex size-1 w-full items-center justify-between space-x-2 pb-5">
            <DeleteAlert cafe={cafe} />
            <Pencil />
          </div>) : (
          <></>
        )}
        <h2 className="text-center text-4xl">{cafe.name}</h2>
        <h4 className="text-center text-xl">{cafe.description}</h4>
      </div>
      {isUserOwner ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CafeOwner cafe={cafe} myDrinks={myDrinks} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <CafeCustomer cafe={cafe} drinkProfiles={drinkProfiles} />
        </Suspense>
      )}
    </div>
  );
};

export default Page;
