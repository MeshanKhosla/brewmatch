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
import { deleteDrink } from "~/actions";
import { toast } from "sonner";
import { DrinkProfile, Cafe, Drink } from "@prisma/client";

type DeleteAlertProps = {
   profile?: DrinkProfile;
   cafe?: Cafe;
   drink?: Drink;
   cafeName?: string;
}

const DeleteAlert = (props: DeleteAlertProps) => {
   const { profile, cafe, drink, cafeName } = props;

   async function handleDelete(deleteItem: string) {
      let res
      if (drink && cafeName) {
         res = await deleteDrink(
            deleteItem,
            cafeName,
         ); // revalidate /cafe/:name
      } else if (profile) {
         // profile delete action
      } else {
         // cafe delete action
      }
      if (res && !res.ok) {
         // alert(res.error)
         toast.error(res.error);
      } else {
         // Close the dialog by getting the first button in the dialog and clicking it
         const b = document.querySelector<HTMLButtonElement>(
            'div[role="dialog"] > button',
         );
         if (b) {
            b.click();
         }
         toast.success(`Drink deleted!`);
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
                  onClick={() => handleDelete(drink?.id || profile?.id || cafe?.id)}>
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default DeleteAlert