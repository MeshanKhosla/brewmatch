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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Link from "next/link";
import { UserRound, ChevronLeft, Pencil } from "lucide-react";
import { authOptions } from "~/server/auth";
import DeleteAlert from "~/components/DeleteAlert";
import CreateCafeForm from "~/components/CreateCafeForm";

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
            <Dialog>
              <DialogTrigger>
                <Pencil />
              </DialogTrigger>
              <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                </DialogHeader>
                <CreateCafeForm cafe={cafe} />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <></>
        )}
        <div className="flex h-full w-full flex-row items-center">
          <div className="flex w-full flex-col items-center">
            <h2 className="text-center text-4xl">{cafe.name}</h2>
            <h4 className="text-center text-xl">{cafe.description}</h4>
          </div>
        </div>
      </div>
      {isUserOwner ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CafeOwner cafe={cafe} myDrinks={myDrinks} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          {myDrinks.length === 0 ? (
            <p className="text-xl">{cafe.name} has no drinks yet!</p>
          ) : drinkProfiles.length === 0 ? (
            <div className="flex items-center text-xl">
              <span>You have no drink profiles yet! Create some in </span>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Link>{" "}
            </div>
          ) : (
            <CafeCustomer cafe={cafe} drinkProfiles={drinkProfiles} />
          )}
        </Suspense>
      )}
    </div>
  );
};

export default Page;
