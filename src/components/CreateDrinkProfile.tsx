import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import CreateDrinkProfileForm from "~/components/CreateDrinkProfileForm";

const CreateDrinkProfile = () => {
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full rounded bg-[#8fbc5c] py-1 text-white hover:bg-[#719646]">
        +
      </DialogTrigger>
      <DialogContent className="my-3 max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create a new Drink Profile</DialogTitle>
        </DialogHeader>
        <CreateDrinkProfileForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDrinkProfile;
