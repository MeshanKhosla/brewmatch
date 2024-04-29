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
import CardHover from "~/components/CardHover";

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
    <div>
      {!canEdit && (
        <Card
          key={profile.id}
          onClick={onCardClick}
          className={`${handleProfileSelection ? "hover:cursor-pointer" : ""} h-full`}
        >
          <div className="max-w group relative mx-auto h-full cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <CardHover />
            <CardHeader className="h-full">
              <div className="grid h-full w-full grid-rows-[max-content_1fr] justify-items-center items-center space-y-4 text-center">
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>
                  {profile.naturalLanguageInput}
                </CardDescription>
                <CardDescription>
                  Ice: {removeEndString(ICE_TO_NAME[profile.ice], " ice")}{" "}
                  <span className="font-semibold">/</span> Sweetness:{" "}
                  {profile.sweetness} <span className="font-semibold">/</span>{" "}
                  Milk: {MILK_TO_NAME[profile.milk]}
                </CardDescription>
              </div>
            </CardHeader>
          </div>
        </Card>
      )}
      {canEdit && (
        <Card key={profile.id} className="h-full">
          <CardHeader className="h-full">
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
            <div className="grid h-full w-full grid-rows-[max-content_1fr] justify-items-center items-center space-y-4 text-center">
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.naturalLanguageInput}</CardDescription>
              <CardDescription>
                Ice: {removeEndString(ICE_TO_NAME[profile.ice], " ice")}{" "}
                <span className="font-semibold">/</span> Sweetness:{" "}
                {profile.sweetness} <span className="font-semibold">/</span>{" "}
                Milk: {MILK_TO_NAME[profile.milk]}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
