'use server'

import type { Drink, DrinkProfile, IceLevel, MilkType } from '@prisma/client'
import { db } from '~/server/db'
import { authOptions } from '~/server/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Index } from "@upstash/vector"
import { env } from '~/env';

type VectorMetadata = {
  drinkId: string,
  drinkName: string,
  drinkDescription: string,
  cafeId: string,
}

const MAX_LENGTH = 191;

const vectorIndex = new Index({
  url: env.UPSTASH_VECTOR_REST_URL,
  token: env.UPSTASH_VECTOR_REST_TOKEN,
})

function isStringValid(str: string) {
  return str.length <= MAX_LENGTH
}

function addSweetnessToDescription(description: string, sweetness: number) {
  return `${description} --- Sweetness level: ${sweetness}`
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

export async function createDrink(cafeId: string, name: string, description: string, price: number, sweetness: number, existingId?: string) {
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

  // get the cafe the drink is being added to
  const currentCafe = await db.cafe.findFirst({ where: { id: cafeId } })

  if (!currentCafe) {
    return {
      ok: false,
      error: 'Cafe not found'
    }
  }
  let drink
  if (existingId) {
    drink = await db.drink.update({
      where: {
        id: existingId
      },
      data: {
        name,
        description,
        price,
        cafeId,
        sweetness,
      }
    })
  } else {
    name = name.trim()
    // Check if drink name already exists
    const existingDrink = await db.drink.findFirst({ where: { name } })

    if (existingDrink) {
      return {
        ok: false,
        error: 'Drink with that name already exists'
      }
    }

    drink = await db.drink.create({
      data: {
        name,
        description,
        price,
        cafeId,
        sweetness,
      }
    })
  }

  const metadata = {
    drinkId: drink.id,
    drinkName: drink.name,
    drinkDescription: addSweetnessToDescription(drink.description, sweetness),
    cafeId: drink.cafeId,
  } as VectorMetadata;

  const res = await vectorIndex.upsert({
    id: drink.id,
    data: drink.description,
    metadata
  })

  if (res !== "Success") {
    return {
      ok: false,
      error: 'Error adding to search index'
    }
  }

  revalidatePath(`/cafe/${currentCafe.name}`)

  return {
    ok: true,
    drink
  }
}

export async function deleteDrink(drink: Drink) {
  const deletedDrink = await db.drink.delete({
    where: {
      id: drink.id
    }
  })

  if (!deletedDrink) {
    return {
      ok: false,
      error: 'Error deleting drink'
    }
  }

  const vectorRes = await vectorIndex.delete(deletedDrink.id)

  if (vectorRes.deleted !== 1) {
    return {
      ok: false,
      error: 'Error deleting from search index'
    }
  }

  revalidatePath('/cafe/[name]')

  return {
    ok: true,
    deletedDrink
  }
}

export async function deleteDrinkProfile(drinkProfile: DrinkProfile) {
  const deletedDrinkProfile = await db.drinkProfile.delete({
    where: {
      id: drinkProfile.id
    }
  })

  if (!deletedDrinkProfile) {
    return {
      ok: false,
      error: 'Error deleting drink profile'
    }
  }

  revalidatePath('/profile')

  return {
    ok: true,
    deletedDrinkProfile
  }
}


/**
 * Get drink recommendations for a given profile in a given cafe
 * @param profile The drink profile to get recommendations for
 * @param cafeId  The cafe to get recommendations from
 * @param k       The number of recommendations to return
 */
export async function getDrinkRecommendations(profile: DrinkProfile, cafeId: string, k: number) {
  const recs = await vectorIndex.query<VectorMetadata>({
    data: addSweetnessToDescription(profile.naturalLanguageInput, profile.sweetness),
    includeMetadata: true,
    filter: `cafeId = "${cafeId}"`,
    topK: k,
  })

  // Fetch the actual drink objects from the database
  const drinkIds = recs.map(rec => rec.metadata?.drinkId).filter(r => typeof r === 'string') as string[]

  const drinks = await db.drink.findMany({
    where: {
      id: {
        in: drinkIds
      }
    }
  })

  return {
    ok: true,
    drinks
  }
}

/**
 * Reason about why a drink was recommended to a user
 * @param drinkProfile The drink profile that was used to make the recommendation
 * @param chosenDrink  The drink that was recommended
 */
export async function getDrinkRecommendationReasoning(drinkProfile: DrinkProfile, chosenDrinks: Drink[]) {
  console.log(drinkProfile)
  console.log(chosenDrinks)
  // TODO: I think we can use Reagent here and do something similar to the reasoning task for the planets
  // in homework
}