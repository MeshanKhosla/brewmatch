'use server'

import { IceLevel, MilkType } from '@prisma/client'
import { db } from '~/server/db'
import { authOptions } from '~/server/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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

// TODO: Do error handling like above
export async function createDrinkProfile(name: string, naturalLanguageInput: string, sweetness: number, ice: IceLevel, milk: MilkType) {
  if (sweetness < 1 || sweetness > 10) {
    return {
      error: 'Sweetness must be between 1 and 10'
    }
  }

  if (!isStringValid(name)) {
    return {
      error: `Name length must be less than ${MAX_LENGTH}`
    }
  }

  if (!isStringValid(naturalLanguageInput)) {
    return {
      error: `Natural language input length must be less than ${MAX_LENGTH}`
    }
  }


  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/discover')
  }

  // Create drink profile
  const drinkProfile = await db.drinkProfile.create({
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

  return drinkProfile
}