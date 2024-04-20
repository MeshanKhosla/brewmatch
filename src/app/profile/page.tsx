import { getServerSession } from "next-auth";
import CreateDrinkProfile from "~/components/CreateDrinkProfile";
import CreateDrinkProfileForm from "~/components/CreateDrinkProfileForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
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
            <Dialog>
              <DialogTrigger className="h-full w-full rounded py-1 text-white">
                <Card key={profile.id}>
                  <CardHeader>
                    <CardTitle>{profile.name}</CardTitle>
                    <CardDescription>
                      {profile.naturalLanguageInput}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="my-3 max-h-screen overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                </DialogHeader>
                <CreateDrinkProfileForm profile={profile} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
      <CreateDrinkProfile />
    </div>
  );
};

export default Page;
