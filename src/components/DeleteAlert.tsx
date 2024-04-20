"use client";

import { Trash2 } from 'lucide-react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { deleteDrink, deleteDrinkProfile } from "~/actions";
import { toast } from "sonner";
import { DrinkProfile, Cafe, Drink } from "@prisma/client";

type DeleteAlertProps = {
   profile?: DrinkProfile;
   cafe?: Cafe;
   drink?: Drink;
}

const DeleteAlert = (props: DeleteAlertProps) => {
   const { profile, cafe, drink } = props;

   async function handleDelete() {
      const results = []
      if (drink) {
         const res = await deleteDrink(drink);
         results.push(res);
      }

      if (profile) {
         const res = await deleteDrinkProfile(profile);
         results.push(res);
      }

      for (const res of results) {
         if (res && !res.ok) {
            toast.error(res.error);
         }
      }

      const b = document.querySelector<HTMLButtonElement>(
         'div[role="dialog"] > button',
      );
      if (b) {
         b.click();
      }

      const allOk = results.every((res) => res.ok);
      if (allOk) {
         toast.success('Successfully deleted!');
      }
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger><Trash2 /></AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Are you sure you want to delete the {drink ? 'drink' : profile ? 'profile' : 'cafe'} '{drink?.name || profile?.name || cafe?.name}'?
               </AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will remove the data for this drink from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="bg-[#8fbc5c] hover:bg-[#719646] text-white">
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction className="bg-[#F9F7F2] border border-[#8fbc5c] hover:bg-[#8fbc5c] text-black"
                  onClick={handleDelete}>
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default DeleteAlert