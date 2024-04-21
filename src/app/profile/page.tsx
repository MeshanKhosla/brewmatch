import { Pencil } from "lucide-react";
import { getServerSession } from "next-auth";
import CreateDrinkProfile from "~/components/CreateDrinkProfile";
import CreateDrinkProfileForm from "~/components/CreateDrinkProfileForm";
import DeleteAlert from "~/components/DeleteAlert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { ICE_TO_NAME, MILK_TO_NAME, removeEndString } from "~/lib/utils";
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
            <Card key={profile.id}>
              <CardHeader>
                <div className="flex justify-between items-center w-full size-1 space-x-2">
                  <DeleteAlert profile={profile} />
                  <Dialog>
                    <DialogTrigger>
                      <Pencil />
                    </DialogTrigger>
                    <DialogContent className="my-3 max-h-screen overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                      </DialogHeader>
                      <CreateDrinkProfileForm profile={profile} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-rows-3 justify-items-center w-full space-y-2">
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>{profile.naturalLanguageInput}</CardDescription>
                  <CardDescription>
                    Ice: {removeEndString(ICE_TO_NAME[profile.ice], " ice")} <span className="font-semibold">/</span>{" "}
                    Sweetness: {profile.sweetness} <span className="font-semibold">/</span>{" "}
                    Milk: {MILK_TO_NAME[profile.milk]}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      <CreateDrinkProfile />
    </div>
  );
};

export default Page;
