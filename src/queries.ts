import { db } from "~/server/db";

export async function getCafesByOwner(userId: string) {
  return db.cafe.findMany({
    where: { userId }
  });
}

export async function getCafeByName(name: string) {
  return db.cafe.findFirst({
    where: { name }
  });
}