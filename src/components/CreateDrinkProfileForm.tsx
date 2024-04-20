"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { DrinkProfile, IceLevel, MilkType } from "@prisma/client";
import { Asterisk } from "lucide-react";
import { createDrinkProfile } from "~/actions";
import { toast } from "sonner";

const MILK_TO_NAME = {
  [MilkType.WHOLE]: "Whole",
  [MilkType.TWO_PERCENT]: "2%",
  [MilkType.ALMOND]: "Almond",
  [MilkType.OAT]: "Oat",
  [MilkType.SOY]: "Soy",
  [MilkType.NONFAT]: "Nonfat",
  [MilkType.COCONUT]: "Coconut",
  [MilkType.NONE]: "None",
};

const ICE_TO_NAME = {
  [IceLevel.NO_ICE]: "No ice",
  [IceLevel.LESS_ICE]: "Less ice",
  [IceLevel.REGULAR_ICE]: "Regular ice",
  [IceLevel.MORE_ICE]: "More ice",
};

const formSchema = z.object({
  name: z.string().min(2).max(30),
  naturalLanguageInput: z.string().min(10).max(190),
  sweetness: z.string(),
  ice: z.nativeEnum(IceLevel),
  milk: z.nativeEnum(MilkType),
});

type CreateDrinkProfileFormProps = {
  profile?: DrinkProfile;
}

const CreateDrinkProfileForm = (props: CreateDrinkProfileFormProps) => {
  const { profile } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name ?? "",
      naturalLanguageInput: profile?.naturalLanguageInput ?? "",
      sweetness: profile?.sweetness.toString() ?? "-1",
      ice: profile?.ice,
      milk: profile?.milk,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createDrinkProfile(
      values.name,
      values.naturalLanguageInput,
      parseInt(values.sweetness),
      values.ice,
      values.milk,
      profile?.id,
    );

    if (res && !res.ok) {
      toast.error(res.error);
    } else {
      // Close the dialog by getting the first button in the dialog and clicking it
      const b = document.querySelector<HTMLButtonElement>(
        'div[role="dialog"] > button',
      );
      if (b) {
        b.click();
      }
      form.reset();
      toast.success(`Drink profile ${profile?.id ? 'updated' : 'created'}!`);
    }
  }

  const nameLength = form.getValues("name").length;
  const descriptionLength = form.getValues("naturalLanguageInput").length;
  const sweetChoice = parseInt(form.getValues("sweetness"));
  const iceChoice = Object.keys(IceLevel).indexOf(form.getValues("ice"));


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Name <Asterisk className="size-3 text-red-500" />{" "}
              </FormLabel>
              <FormControl>
                <Input
                  minLength={2}
                  maxLength={30}
                  placeholder="Chocolatey Mood"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {nameLength} / 30{" "}
                {nameLength < 2 && "(Minimum 2 characters)"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="naturalLanguageInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-col">
                <div className="flex">
                  Description <Asterisk className="size-3 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Be as descriptive. This is used to match you with your
                  perfect drink!
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  minLength={10}
                  maxLength={190}
                  placeholder="Iced chocolatey coffee with cold foam"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {descriptionLength} / 190{" "}
                {descriptionLength < 10 && "(Minimum 10 characters)"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sweetness"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Sweetness <Asterisk className="size-3 text-red-500" />{" "}
              </FormLabel>
              <FormControl>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-10"
                  >
                    {Array.from(
                      { length: 10 },
                      (_, index) => index + 1,
                    ).map((sweetness) => (
                      <div
                        key={sweetness.toString()}
                        className="grid grid-rows-2 items-center space-y-3"
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value={sweetness.toString()}
                            id={sweetness.toString()}
                            style={{ color: "#8fbc5c" }}
                            className={
                              sweetness <= sweetChoice
                                ? "bg-[#8fbc5c]"
                                : "bg-[#D9D9D9]"
                            }
                          />
                          <div
                            style={{
                              marginLeft: "5px",
                              top: "10px",
                              width: sweetness <= 9 ? "100%" : "",
                              height: "8px",
                              background:
                                sweetness < sweetChoice
                                  ? "#8fbc5c"
                                  : "#D9D9D9",
                              zIndex: -1,
                            }}
                          ></div>
                        </div>
                        <Label
                          htmlFor={sweetness.toString()}
                          className={
                            sweetness === sweetChoice
                              ? "font-bold"
                              : ""
                          }
                        >
                          {sweetness === 1
                            ? sweetness + "\nespresso"
                            : sweetness === 10
                              ? sweetness + "\nfrap"
                              : sweetness}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Ice <Asterisk className="size-3 text-red-500" />{" "}
              </FormLabel>
              <FormControl>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-4"
                  >
                    {Object.keys(IceLevel).map((iceLevel, index) => (
                      <div
                        key={iceLevel}
                        className="grid grid-rows-2 items-center space-y-3"
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value={iceLevel}
                            id={iceLevel}
                            style={{ color: "#8fbc5c" }}
                            className={
                              index <= iceChoice
                                ? "bg-[#8fbc5c]"
                                : "bg-[#D9D9D9]"
                            }
                          />
                          <div
                            style={{
                              marginLeft: "5px",
                              top: "10px",
                              width: index <= 2 ? "100%" : "",
                              height: "8px",
                              background:
                                index < iceChoice ? "#8fbc5c" : "#D9D9D9",
                              zIndex: -1,
                            }}
                          ></div>
                        </div>
                        <Label
                          htmlFor={iceLevel}
                          className={
                            index === iceChoice ? "font-bold" : ""
                          }
                        >
                          {ICE_TO_NAME[iceLevel as IceLevel]}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="milk"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Milk <Asterisk className="size-3 text-red-500" />{" "}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="grid grid-cols-2"
                >
                  {Object.keys(MilkType).map((milkType) => (
                    <div
                      key={milkType}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={milkType}
                        id={milkType}
                        style={{ color: "#8fbc5c" }}
                      />
                      <Label htmlFor={milkType}>
                        {MILK_TO_NAME[milkType as MilkType]}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            !form.formState.isValid || form.formState.isSubmitting
          }
          className="w-full bg-[#8fbc5c] hover:bg-[#719646]"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Form>
  )
}

export default CreateDrinkProfileForm