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
import { IceLevel, MilkType } from "@prisma/client"
import { Circle } from "lucide-react"


const MILK_TO_NAME = {
  [MilkType.WHOLE]: "Whole",
  [MilkType.TWO_PERCENT]: "2%",
  [MilkType.ALMOND]: "Almond",
  [MilkType.OAT]: "Oat",
  [MilkType.SOY]: "Soy",
  [MilkType.NONFAT]: "Nonfat",
  [MilkType.COCONUT]: "Coconut",
  [MilkType.NONE]: "None",
}

const ICE_TO_NAME = {
  [IceLevel.NO_ICE]: "No ice",
  [IceLevel.LESS_ICE]: "Less ice",
  [IceLevel.REGULAR_ICE]: "Regular ice",
  [IceLevel.MORE_ICE]: "More ice",
}

const formSchema = z.object({
  name: z.string().min(2).max(30),
  naturalLanguageInput: z.string().min(10).max(190),
  sweetness: z.string(),
  ice: z.nativeEnum(IceLevel),
  milk: z.nativeEnum(MilkType)
})


const CreateDrinkProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      naturalLanguageInput: "",
      sweetness: "-1",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const nameLength = form.getValues("name").length
  const descriptionLength = form.getValues("naturalLanguageInput").length
  const sweetChoice = parseInt(form.getValues("sweetness"))
  const iceChoice = Object.keys(IceLevel).indexOf(form.getValues("ice"))
  
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
            name="sweetness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sweetness</FormLabel>
                <FormControl>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <RadioGroup onValueChange={field.onChange} className='grid grid-cols-10'>
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((sweetness) => (
                        <div key={sweetness.toString()} className="grid grid-rows-2 items-center space-y-3">
                          <div className="flex items-center">
                            <Circle color={sweetness <= sweetChoice ? "#8fbc5c" : "#D9D9D9"} fill={sweetness <= sweetChoice ? "#8fbc5c" : "#D9D9D9"} style={{ marginRight: '-22px' }} />
                            <RadioGroupItem value={sweetness.toString()} id={sweetness.toString()} style={{ color: "#D9D9D9" }} />
                          </div>
                          <Label htmlFor={sweetness.toString()} className={sweetness === sweetChoice ? 'font-extrabold' : ''} >
                            {sweetness === 1 ? sweetness + '\nespresso' : sweetness === 10 ? sweetness + '\nfrap' : sweetness}
                          </Label>
                        </div>
                      ))}
                      <div className="col-span-10" style={{
                        marginLeft: '5px', marginTop: '-63px', width: 'calc(90% + 20px)', height: '8px',
                        background: `linear-gradient(to right, #8fbc5c 0%, #8fbc5c ${(sweetChoice - 1) * 11}%, #D9D9D9 ${(sweetChoice - 1) * 11}%)`,
                        zIndex: -1
                      }}>
                      </div>
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
                <FormLabel>Ice</FormLabel>
                <FormControl>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <RadioGroup onValueChange={field.onChange} className='grid grid-cols-4'>
                      {Object.keys(IceLevel).map((iceLevel, index) => (
                        <div key={iceLevel} className="grid grid-rows-2 items-center space-y-3">
                          <div className="flex items-center">
                            <Circle color={index <= iceChoice ? "#8fbc5c" : "#D9D9D9"} fill={index <= iceChoice ? "#8fbc5c" : "#D9D9D9"} style={{ marginRight: '-20px' }} />
                            <RadioGroupItem value={iceLevel} id={iceLevel} style={{ color: "#D9D9D9" }} />
                            <div style={{
                              marginLeft: '5px', top: '10px', width: index <= 2 ? '100%' : '', height: '8px',
                              background: index < iceChoice ? "#8fbc5c" : "#D9D9D9",
                              zIndex: -1
                            }}>
                            </div>
                          </div>
                          <Label htmlFor={iceLevel} className={index === iceChoice ? 'font-extrabold' : ''} >
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
                <FormLabel>Milk</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} className='grid grid-cols-2'>
                    {Object.keys(MilkType).map((milkType) => (
                      <div key={milkType} className="flex items-center space-x-2">
                        <RadioGroupItem value={milkType} id={milkType} />
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
          <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className="bg-[#8fbc5c] hover:bg-[#719646]" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateDrinkProfile