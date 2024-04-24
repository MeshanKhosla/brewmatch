"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import CreateCafeForm from "~/components/CreateCafeForm";

const CreateCafe = () => {

  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full w-full rounded bg-[#8fbc5c] py-1 text-white hover:bg-[#719646]">
          +
        </DialogTrigger>
        <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Create a new cafe</DialogTitle>
          </DialogHeader>
          <CreateCafeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCafe;
