"use client";

import { type Cafe } from "@prisma/client";
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "~/components/ui/card";

type CafeCardProps = {
   cafe: Cafe;
};

export function CafeCard(props: CafeCardProps) {
   const { cafe } = props;

   return (
      <Card key={cafe.id} className="h-full">
         <div
            className="h-full group relative cursor-pointer bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mx-auto max-w rounded-lg">
            <span className="absolute top-0 z-0 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
            <div className="relative z-10 mx-auto max-w-md">
               <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
            </div>
            <CardHeader className="h-full">
               <div className="grid grid-rows-2 h-full">
                  <CardTitle>{cafe.name}</CardTitle>
                  <CardDescription className="self-start pt-2">{cafe.description}</CardDescription>
               </div>
            </CardHeader>
         </div>
      </Card>
   );
}
