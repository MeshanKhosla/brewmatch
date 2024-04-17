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
import { createCafe } from "~/actions"
import { Asterisk } from "lucide-react"
import { toast } from "sonner"


const formSchema = z.object({
  // name: z.string().min(2).max(30),
  // description: z.string().min(10).max(190),
  // neither should have trailing or leading whitespace
  name: z.string().refine((v) => v.trim().length >= 2 && v.trim().length <= 30, {
    message: "Name must be between 2 and 30 characters",
  }),
  description: z.string().refine((v) => v.trim().length >= 10 && v.trim().length <= 190, {
    message: "Description must be between 10 and 190 characters",
  }),
})


const CreateDrinkProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createCafe(values.name, values.description) // redirect /cafe/:name
    if (res && !res.ok) {
      // alert(res.error)
      toast.error(res.error)
    } else {
      toast.success("Cafe created!")
    }
  }

  const nameLength = form.getValues("name").trim().length
  const descriptionLength = form.getValues("description").trim().length

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Name <Asterisk className="text-red-500 size-3" /> </FormLabel>
                <FormControl>
                  <Input minLength={2} maxLength={30} placeholder="Sodoi Coffee" {...field} />
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
                <FormLabel className="flex">Description <Asterisk className="text-red-500 size-3" /></FormLabel>
                <FormControl>
                  <Textarea minLength={10} maxLength={190} placeholder="A Tasting House For Your Tastebuds" {...field} />
                </FormControl>
                <FormDescription>
                  {descriptionLength} / 190 {descriptionLength < 10 && "(Minimum 10 characters)"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className="bg-[#8fbc5c] hover:bg-[#719646] w-full" type="submit">Create</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateDrinkProfile