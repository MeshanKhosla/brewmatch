"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import CreateDrinkForm from "~/components/CreateDrinkForm";
import { useState } from 'react';

const CreateDrink = ({ cafeId }: { cafeId: string }) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(false);
  };

  return (
    <Collapsible open={isOpen}
      onOpenChange={setIsOpen} >
      <CollapsibleTrigger className={`h-full w-full rounded py-1  ${isOpen ? 'bg-[#F9F7F2] border border-[#8fbc5c] hover:bg-[#8fbc5c] text-black' : 'bg-[#8fbc5c] hover:bg-[#719646] text-white'}`}>
        {isOpen ? 'Cancel' : '+'}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex items-center justify-center text-black p-4 text-center">
          <h2 className="text-2xl text-center">Create a new drink</h2>
        </div>
        <CreateDrinkForm cafe={cafeId} onFormSubmit={toggle} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CreateDrink;
