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
import { createDrink } from "~/actions";
import type { Drink } from "@prisma/client";
import { Asterisk } from "lucide-react";
import { toast } from "sonner";

const decimalRegExp = /^[0-9]+(\.[0-9]{2})?$/;

const formSchema = z.object({
  name: z
    .string()
    .refine((v) => v.trim().length >= 2 && v.trim().length <= 30, {
      message: "Name must be between 2 and 30 characters",
    }),
  description: z
    .string()
    .refine((v) => v.trim().length >= 10 && v.trim().length <= 190, {
      message: "Description must be between 10 and 190 characters",
    }),
  price: z.string().refine((value) => decimalRegExp.test(value.trim()), {
    message: "Price must be a number or a decimal with two decimal places",
  }),
  sweetness: z.string(),
  cafeId: z.string(),
});

type CreateDrinkFormProps = {
  cafe: string;
  drink?: Drink;
  onFormSubmit?: () => void;
};

const CreateDrinkForm = (props: CreateDrinkFormProps) => {
  const { cafe, drink, onFormSubmit } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: drink?.name ?? "",
      description: drink?.description ?? "",
      price: drink?.price.toString() ?? "",
      sweetness: drink?.sweetness.toString() ?? "-1",
      cafeId: cafe,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createDrink(
      values.cafeId,
      values.name,
      values.description,
      Number(values.price),
      parseInt(values.sweetness),
      drink?.id,
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
      form.reset();
      toast.success(`Drink ${drink?.id ? "updated" : "created"}!`);
      if (onFormSubmit) {
        onFormSubmit();
      }
    }
  }

  const nameLength = form.getValues("name").trim().length;
  const descriptionLength = form.getValues("description").trim().length;
  const priceValue = form.getValues("price");
  const containsDecimal = priceValue.includes(".");
  let decimalPlaces = 0;
  if (containsDecimal) {
    const split = priceValue.split(".")[1];
    if (split) {
      decimalPlaces = split.length;
    }
  }
  const sweetChoice = parseInt(form.getValues("sweetness"));

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
                  placeholder="Iced Matcha Latte"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {nameLength} / 30 {nameLength < 2 && "(Minimum 2 characters)"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-col">
                <div className="flex">
                  Description <Asterisk className="size-3 text-red-500" />
                </div>
                <p className="py-1 text-sm text-muted-foreground">
                  Be descriptive. This is used to match users with their perfect
                  drink!
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  minLength={10}
                  maxLength={190}
                  placeholder="A cold grassy drink with soy milk and sweetened with honey"
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Price <Asterisk className="size-3 text-red-500" />{" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  minLength={1}
                  maxLength={10}
                  placeholder="3.50"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {!containsDecimal && " "}
                {containsDecimal &&
                  decimalPlaces != 2 &&
                  "Need 2 decimal places"}
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
                    {Array.from({ length: 10 }, (_, index) => index + 1).map(
                      (sweetness) => (
                        <div
                          key={sweetness.toString()}
                          className="grid grid-rows-2 space-y-3"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem
                              value={sweetness.toString()}
                              id={sweetness.toString()}
                              style={{ color: "#8fbc5c" }}
                              className={
                                sweetness <= sweetChoice
                                  ? "border border-[#8fbc5c] bg-[#8fbc5c]"
                                  : "border border-[#D9D9D9] bg-[#D9D9D9]"
                              }
                            />
                            <div
                              style={{
                                marginLeft: "-1px",
                                marginRight: "-15px",
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
                              sweetness === sweetChoice ? "font-bold" : ""
                            }
                          >
                            {sweetness === 1
                              ? sweetness + "\nespresso"
                              : sweetness === 10
                                ? sweetness + "\nfrap"
                                : sweetness}
                          </Label>
                        </div>
                      ),
                    )}
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="w-full bg-[#8fbc5c] hover:bg-[#719646]"
          type="submit"
        >
          {props.drink ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateDrinkForm;
