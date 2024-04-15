"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "~/components/ui/label"
import { MilkType } from "@prisma/client"

const MILK_TO_NAME = {
  [MilkType.WHOLE]: "Whole",
  [MilkType.TWO_PERCENT]: "2%",
  [MilkType.ALMOND]: "Almond",
  [MilkType.OAT]: "Oat",
  [MilkType.SOY]: "Soy",
  [MilkType.NONFAT]: "Nonfat",
  [MilkType.COCONUT]: "Coconut",
}

const formSchema = z.object({
  name: z.string().min(2).max(30),
  naturalLanguageInput: z.string().min(10).max(190),
  milk: z.nativeEnum(MilkType)
})


const CreateDrinkProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      naturalLanguageInput: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const nameLength = form.getValues("name").length
  const descriptionLength = form.getValues("naturalLanguageInput").length

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input minLength={2} maxLength={30} placeholder="Chocolatey Mood" {...field} />
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
            name="naturalLanguageInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea minLength={10} maxLength={190} placeholder="Iced chocolatey coffee with cold foam" {...field} />
                </FormControl>
                <FormDescription>
                  {descriptionLength} / 190 {descriptionLength < 10 && "(Minimum 10 characters)"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="milk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Milk</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
                    <div className="flex gap-3">
                      {Object.keys(MilkType).map((milkType) => (
                        <div key={milkType} className="flex items-center space-x-2">
                          <RadioGroupItem value={milkType} id={milkType} />
                          <Label htmlFor={milkType}>
                            {MILK_TO_NAME[milkType as MilkType]}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className="bg-[#8fbc5c] hover:bg-[#719646]" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateDrinkProfile