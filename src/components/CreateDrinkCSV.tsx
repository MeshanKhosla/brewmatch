"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import CreateDrinkForm from "~/components/CreateDrinkForm";
import { Importer, ImporterField } from 'react-csv-importer';
import { useState } from 'react';
import 'react-csv-importer/dist/index.css';
import { createDrink } from "~/actions";
import { toast } from "sonner";

const CreateDrinkCSV = ({ cafeId }: { cafeId: string }) => {

  return (
   <div>
   <h1>The CSV should have 4 columns for the details of each Drink. The columns are name, description, price (numbers only), and sweetness (1-10 range).</h1>
   <div>
    <Importer
      dataHandler={async (rows) => {
         try {
            for (const row of rows) {
               // Extract data from the row
               const name = row.name;
               const description = row.description;
               const price = row.price;
               const sweetness = row.sweetness;
       
               // Perform error checking
               // mention which row went wrong 
               if (!name || !description || !price || !sweetness) {
                 console.error("Invalid data in row:", row);
                 continue; // Skip this row and move to the next one
               }
               
               // may need to do more error checking
       
               // Call the createDrink function with the validated data
               const res = await createDrink(
                  cafeId,
                  name,
                  description,
                  Number(price),
                  parseInt(sweetness),
                  
              ); // revalidate /cafe/:name
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
                  toast.success('Drink created!');
              }
            }
             
      
            console.log("Import successful!");
          } catch (error) {
            console.error("Error importing data:", error);
            // Handle error
          }
      }}
      chunkSize={10000} // optional, internal parsing chunk size in bytes
      defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
      restartable={false} // optional, lets user choose to upload another file when import is complete
    >
      <ImporterField name="name" label="Name" />
      <ImporterField name="description" label="Description" />
      <ImporterField name="price" label="Price" />
      <ImporterField name="sweetness" label="Sweetness" />
    </Importer>
  </div>
   
 </div>
  );
};

export default CreateDrinkCSV;
