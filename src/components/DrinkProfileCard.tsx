"use client";

import { type DrinkProfile } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Pencil } from "lucide-react";
import DeleteAlert from "~/components/DeleteAlert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ICE_TO_NAME, MILK_TO_NAME, removeEndString } from "~/lib/utils";
import CreateDrinkProfileForm from "~/components/CreateDrinkProfileForm";

type DrinkProfileCardProps = {
  canEdit: boolean;
  profile: DrinkProfile;
  handleProfileSelection?: (profile: DrinkProfile) => void;
};

export function DrinkProfileCard(props: DrinkProfileCardProps) {
  const { canEdit, profile, handleProfileSelection } = props;

  const onCardClick = () => {
    if (handleProfileSelection) {
      handleProfileSelection(profile);
    }
  };

  return (
    <Card
      key={profile.id}
      onClick={onCardClick}
      className={handleProfileSelection ? "hover:cursor-pointer" : ""}
    >
      <div className="flex w-full items-center justify-between"></div>
      <div
      className="group relative cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mx-auto max-w rounded-lg">
      <span className="absolute top-0 z-0 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
      <div className="relative z-10 mx-auto max-w-md">
          <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
          </div>
      <CardHeader>
        {canEdit && (
          <div className="flex size-1 w-full items-center justify-between space-x-2 pb-5">

            <DeleteAlert profile={profile} />
            <Dialog>
              <DialogTrigger>
                <Pencil />
              </DialogTrigger>
              <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                </DialogHeader>
                <CreateDrinkProfileForm profile={profile} />
              </DialogContent>
            </Dialog>
            </div>
          )}
        <div className="grid w-full grid-rows-3 justify-items-center space-y-2">
          <CardTitle>{profile.name}</CardTitle>
          <CardDescription>{profile.naturalLanguageInput}</CardDescription>
          <CardDescription>
            Ice: {removeEndString(ICE_TO_NAME[profile.ice], " ice")}{" "}
            <span className="font-semibold">/</span> Sweetness:{" "}
            {profile.sweetness} <span className="font-semibold">/</span> Milk:{" "}
            {MILK_TO_NAME[profile.milk]}
          </CardDescription>
        </div>
      </CardHeader>
      </div>
    </Card>
  );
}


