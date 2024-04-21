import { IceLevel, MilkType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MILK_TO_NAME = {
  [MilkType.WHOLE]: "Whole",
  [MilkType.TWO_PERCENT]: "2%",
  [MilkType.ALMOND]: "Almond",
  [MilkType.OAT]: "Oat",
  [MilkType.SOY]: "Soy",
  [MilkType.NONFAT]: "Nonfat",
  [MilkType.COCONUT]: "Coconut",
  [MilkType.NONE]: "None",
};

export const ICE_TO_NAME = {
  [IceLevel.NO_ICE]: "No ice",
  [IceLevel.LESS_ICE]: "Less ice",
  [IceLevel.REGULAR_ICE]: "Regular ice",
  [IceLevel.MORE_ICE]: "More ice",
};

export function removeEndString(str: string, end: string) {
  if (str.endsWith(end)) {
    return str.slice(0, -end.length);
  }
  return str;
}