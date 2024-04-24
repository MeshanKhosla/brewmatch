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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { createCafe } from "~/actions";
import { Asterisk } from "lucide-react";
import { toast } from "sonner";

const latitudeRegExp = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/;
const longitudeRegExp = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/;

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
  latitude: z.string().refine((value) => latitudeRegExp.test(value.trim()), {
    message: "Input must be a valid latitude",
  }),
  longitude: z.string().refine((value) => longitudeRegExp.test(value.trim()), {
    message: "Input must be a valid longitude",
  }),
});

const CreateDrinkProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createCafe(
      values.name,
      values.description,
      Number(values.latitude),
      Number(values.longitude),
    ); // redirects /cafe/:name
    if (res && !res.ok) {
      toast.error(res.error);
    } else {
      toast.success("Cafe created!");
    }
  }

  const nameLength = form.getValues("name").trim().length;
  const descriptionLength = form.getValues("description").trim().length;

  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full w-full rounded bg-[#8fbc5c] py-1 text-white hover:bg-[#719646]">
          +
        </DialogTrigger>
        <DialogContent className="my-3 max-h-screen max-w-[85%] overflow-y-scroll md:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Create a new cafe</DialogTitle>
          </DialogHeader>
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
                        placeholder="Sodoi Coffee"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      Description <Asterisk className="size-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        minLength={10}
                        maxLength={190}
                        placeholder="A Tasting House For Your Tastebuds"
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
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      Latitude <Asterisk className="size-3 text-red-500" />{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        minLength={1}
                        maxLength={10}
                        placeholder="37.8674"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      Longitude <Asterisk className="size-3 text-red-500" />{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        minLength={1}
                        maxLength={11}
                        placeholder="122.2595"
                        {...field}
                      />
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateDrinkProfile;
