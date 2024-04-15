'use server'

import { IceLevel, MilkType } from '@prisma/client'
import { db } from '~/server/db'

const MAX_LENGTH = 191;

function ensureStringLengthOrThrow(str: string) {
  if (str.length > MAX_LENGTH) {
    throw new Error(`String length must be less than ${MAX_LENGTH}`)
  }
}

export async function createCafe() {
  console.log('Creating cafe...')
}

export async function createDrinkProfile(name: string, naturalLanguageInput: string, sweetness: number, ice: IceLevel, milk: MilkType) {
  // Validations
  if (sweetness < 1 || sweetness > 10) {
    throw new Error('Sweetness must be between 1 and 10')
  }

  ensureStringLengthOrThrow(name)
  ensureStringLengthOrThrow(naturalLanguageInput)

  // Create drink profile
  const drinkProfile = await db.drinkProfile.create({
    data: {
      name,
      naturalLanguageInput,
      sweetness,
      ice,
      milk,
    }
  })

  return drinkProfile
}