"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateDrinkForm from "~/components/CreateDrinkForm";
import CreateDrinkCSV from "~/components/CreateDrinkCSV";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useState } from "react";

const CreateDrink = ({ cafeId }: { cafeId: string }) => {
  const [selectedOption, setSelectedOption] = useState("single");

  return (
    <div className="flex flex-col gap-3 pb-10">
      <RadioGroup
        className="grid grid-cols-2 pt-8"
        defaultValue="single"
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="single"
            id="single"
            style={{ color: "#8fbc5c" }}
          />
          <Label
            htmlFor="single"
            className={"single" === selectedOption ? "font-bold" : ""}
          >
            Single Form
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="csv" id="csv" style={{ color: "#8fbc5c" }} />
          <Label
            htmlFor="csv"
            className={"csv" === selectedOption ? "font-bold" : ""}
          >
            CSV Import
          </Label>
        </div>
      </RadioGroup>
      {selectedOption === "single" &&
        <Dialog>
          <DialogTrigger className="h-full w-full rounded bg-[#8fbc5c] py-1 text-white hover:bg-[#719646]">
            +
          </DialogTrigger>
          <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
            <DialogHeader>
              <DialogTitle>Create a new drink</DialogTitle>
            </DialogHeader>
            <CreateDrinkForm cafe={cafeId} />
          </DialogContent>
        </Dialog>
      }
      {selectedOption === "csv" && <CreateDrinkCSV cafeId={cafeId} />}
    </div>
  );
};

export default CreateDrink;
