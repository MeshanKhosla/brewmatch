'use server'

import { type IceLevel, type MilkType } from '@prisma/client'
import { db } from '~/server/db'
import { authOptions } from '~/server/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const MAX_LENGTH = 191;

function isStringValid(str: string) {
  return str.length <= MAX_LENGTH
}

export async function createCafe(name: string, description: string) {
  if (!isStringValid(name)) {
    return {
      ok: false,
      error: `Name length must be less than ${MAX_LENGTH}`
    }
  }

  if (!isStringValid(description)) {
    return {
      ok: false,
      error: `Description length must be less than ${MAX_LENGTH}`
    }
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/discover')
  }

  name = name.trim()
  // Check if cafe name already exists
  const existingCafe = await db.cafe.findFirst({ where: { name } })

  if (existingCafe) {
    return {
      ok: false,
      error: 'Cafe with that name already exists'
    }
  }

  const cafe = await db.cafe.create({
    data: {
      name,
      description,
      createdBy: {
        connect: {
          id: session.user.id
        }
      }
    }
  })

  redirect(`/cafe/${cafe.name}`)
}

export async function createDrinkProfile(name: string, naturalLanguageInput: string, sweetness: number, ice: IceLevel, milk: MilkType, existingId?: string,) {
  if (sweetness < 1 || sweetness > 10) {
    return {
      ok: false,
      error: 'Sweetness must be between 1 and 10'
    }
  }

  if (!isStringValid(name)) {
    return {
      ok: false,
      error: `Name length must be less than ${MAX_LENGTH}`
    }
  }

  if (!isStringValid(naturalLanguageInput)) {
    return {
      ok: false,
      error: `Natural language input length must be less than ${MAX_LENGTH}`
    }
  }


  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/discover')
  }

  // Create or update drink profile
  let drinkProfile
  if (existingId) {
    drinkProfile = await db.drinkProfile.update({
      where: {
        id: existingId
      },
      data: {
        name,
        naturalLanguageInput,
        sweetness,
        ice,
        milk,
      }
    })
  } else {
    drinkProfile = await db.drinkProfile.create({
      data: {
        name,
        naturalLanguageInput,
        sweetness,
        ice,
        milk,
        creator: {
          connect: {
            id: session.user.id
          }
        }
      }
    })
  }

  revalidatePath('/profile')

  return {
    ok: true,
    drinkProfile
  }
}

export async function createDrink(cafeId: string, name: string, description: string, price: number, sweetness: number) {
  if (sweetness < 1 || sweetness > 10) {
    return {
      ok: false,
      error: 'Sweetness must be between 1 and 10'
    }
  }

  if (!isStringValid(name)) {
    return {
      ok: false,
      error: `Name length must be less than ${MAX_LENGTH}`
    }
  }

  if (!isStringValid(description)) {
    return {
      ok: false,
      error: `Description length must be less than ${MAX_LENGTH}`
    }
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/discover')
  }

  name = name.trim()
  // Check if drink name already exists
  const existingDrink = await db.drink.findFirst({ where: { name } })

  if (existingDrink) {
    return {
      ok: false,
      error: 'Drink with that name already exists'
    }
  }

  // get the cafe the drink is being added to
  const currentCafe = await db.cafe.findFirst({ where: { id: cafeId } })

  if (!currentCafe) {
    return {
      ok: false,
      error: 'Cafe not found'
    }
  }

  const drink = await db.drink.create({
    data: {
      name,
      description,
      price,
      cafeId,
      sweetness,
    }
  })

  revalidatePath(`/cafe/${currentCafe.name}`)

  return {
    ok: true,
    drink
  }
}