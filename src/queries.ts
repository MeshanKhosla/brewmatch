import { db } from "~/server/db";

export async function getCafesByOwner(userId: string) {
  return await db.cafe.findMany({
    where: { userId }
  });
}

export async function getCafeByName(name: string) {
  return await db.cafe.findFirst({
    where: { name }
  });
}

export async function getAllCafes() {
  return await db.cafe.findMany();
}

export async function getDrinkProfilesByCreator(userId: string) {
  return await db.drinkProfile.findMany({
    where: { userId }
  });
}

export async function getDrinksByCafe(id: string) {
  return await db.drink.findMany({
    where: { cafeId: id }
  });
}