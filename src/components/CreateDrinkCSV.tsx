"use client";

import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { createDrink } from "~/actions";
import { toast } from "sonner";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const decimalRegExp = /^[0-9]+(\.[0-9]{2})?$/;
const sweetScaleRegex = /^(?:[1-9]|10)$/;

const CreateDrinkCSV = ({ cafeId }: { cafeId: string }) => {
  const [invalidNames, setInvalidNames] = useState<{ line: number, value: string }[]>([]);
  const [invalidDescriptions, setInvalidDescriptions] = useState<{ line: number, value: string }[]>([]);
  const [invalidPrices, setInvalidPrices] = useState<{ line: number, value: string }[]>([]);
  const [invalidSweetness, setInvalidSweetness] = useState<{ line: number, value: string }[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  let skipHeader = false;
  let error = 0;
  let emptyLines = 0;

  return (
    <div>
      <h1>
        The CSV should have 4 columns for the details of each Drink. The columns
        are name, description, price (numbers only), and sweetness (whole number in the 1-10 range).
      </h1>
      <div>
        <style>
          {`
            .CSVImporter_FileStep__mainResultBlock {
              max-width:60vw;   
            }
         `}
        </style>
        <Importer
          defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
          restartable={true} // optional, lets user choose to upload another file when import is complete

          dataHandler={async (rows) => {
            setInvalidNames([]);
            setInvalidDescriptions([]);
            setInvalidPrices([]);
            setInvalidSweetness([]);
            setShowErrorAlert(false);
            const drinks = rows.filter((drink, index) => {
              if (Object.values(drink).some(value => value === undefined)) {
                emptyLines += 1;
                return false;
              }
              const drinkName = drink.name as string;
              const drinkDescription = drink.description as string;
              const drinkPrice = drink.price as string;
              const drinkSweetness = drink.sweetness as string;
              const line = skipHeader ? index + 1 : index + 2;
              let error = true;

              if (drinkName.length < 2 || drinkName.length > 30) {
                setInvalidNames((prev) => [...prev, { line, value: drinkName }]);
                error = false;
              }
              if (drinkDescription.length < 10 || drinkDescription.length > 190) {
                setInvalidDescriptions((prev) => [...prev, { line, value: drinkDescription }]);
                error = false;
              }
              if (!decimalRegExp.test(drinkPrice)) {
                setInvalidPrices((prev) => [...prev, { line, value: drinkPrice }]);
                error = false;
              }
              if (!sweetScaleRegex.test(drinkSweetness)) {
                setInvalidSweetness((prev) => [...prev, { line, value: drinkSweetness }]);
                error = false;
              }
              return error;
            });
            for (const [key, value] of Object.entries(drinks)) {
              // Call the createDrink function with the validated data
              const res = await createDrink(
                cafeId,
                value.name,
                value.description,
                Number(value.price),
                parseInt(value.sweetness),
              ); // revalidate /cafe/:name
              if (res && !res.ok) {
                // alert(res.error)
                toast.error(res.error);
                error += 1;
              }
            }
            toast[drinks.length - error !== rows.length - emptyLines ? 'error' : 'success']
              (`Successfully added ${drinks.length - error} drinks out of ${rows.length - emptyLines}`);
          }}

          onStart={({ file, preview, fields, columnFields }) => {
            skipHeader = preview.skipHeaders;
          }}

          onComplete={({ file, fields }) => {
            if ([invalidNames, invalidDescriptions, invalidPrices, invalidSweetness].some(array => array.length > 0)) {
              setShowErrorAlert(true);
            }
          }}
        >
          <ImporterField name="name" label="Name" />
          <ImporterField name="description" label="Description" />
          <ImporterField name="price" label="Price" />
          <ImporterField name="sweetness" label="Sweetness" />
        </Importer>
        {showErrorAlert && (
          <div className="pt-2">
            <Card className="border border-red-500 border-2">
              <CardHeader>
                <CardTitle className="text-red-500">Errors</CardTitle>
                <CardDescription className="text-red-500">
                  {invalidNames.length > 0 && (
                    <div key="invalidNames">
                      <br />
                      Invalid names:
                      <br />
                      Names must be between 2 and 30 characters.
                      <br />
                      {invalidNames.map(({ line, value }) => (
                        <div key={`invalidName-${line}`}>
                          Line {line} - invalid name value '{value}'
                        </div>
                      ))}
                    </div>
                  )}
                  {invalidDescriptions.length > 0 && (
                    <div key="invalidDescs">
                      <br />
                      Invalid descriptions:
                      <br />
                      Descriptions must be between 10 and 190 characters.
                      <br />
                      {invalidDescriptions.map(({ line, value }) => (
                        <div key={`invalidDesc-${line}`}>
                          Line {line} - invalid description value '{value}'
                        </div>
                      ))}
                    </div>
                  )}
                  {invalidPrices.length > 0 && (
                    <div key="invalidPrices">
                      <br />
                      Invalid prices:
                      <br />
                      Prices must be a number or a decimal with two decimal places.
                      <br />
                      {invalidPrices.map(({ line, value }) => (
                        <div key={`invalidPrice-${line}`}>
                          Line {line} - invalid price value '{value}'
                        </div>
                      ))}
                    </div>
                  )}
                  {invalidSweetness.length > 0 && (
                    <div key="invalidSweets">
                      <br />
                      Invalid sweetness levels:
                      <br />
                      Sweetness levels must be an integer from 1 to 10.
                      <br />
                      {invalidSweetness.map(({ line, value }) => (
                        <div key={`invalidSweet-${line}`}>
                          Line {line} - invalid sweetness level value '{value}'
                        </div>
                      ))}
                    </div>
                  )}
                </CardDescription>
                <br />
                <Button
                  className="w-full bg-[#F9F7F2] border border-[#FE8B83] hover:bg-[#FE8B83] text-black"
                  type="button"
                  onClick={() => (setShowErrorAlert(false))}
                >Dismiss</Button>
              </CardHeader>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDrinkCSV;
