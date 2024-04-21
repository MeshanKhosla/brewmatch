"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import CreateDrinkForm from "~/components/CreateDrinkForm";

const CreateDrink = ({ cafeId }: { cafeId: string }) => {

  return (
    <Dialog>
      <DialogTrigger className='h-full w-full rounded py-1 bg-[#8fbc5c] hover:bg-[#719646] text-white'>
        +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new drink</DialogTitle>
        </DialogHeader>
        <CreateDrinkForm cafe={cafeId} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDrink;
