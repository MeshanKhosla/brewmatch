import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import CreateDrink from "~/components/CreateDrink";
import { getCafeByName, getDrinksByCafe } from "~/queries"
import { authOptions } from "~/server/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = params
  const decodedName = decodeURIComponent(name)

  const cafe = await getCafeByName(decodedName)
  if (!cafe) {
    redirect("/discover")
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1 className='text-2xl font-semibold'>Sign in to view {cafe.name}</h1>
  }

  const myDrinks = await getDrinksByCafe(cafe.id);

  return (
    <div>
      <div className="flex items-center justify-center bg-[#F7F0DD] text-black p-4 text-center py-12">
        <h2 className="text-4xl text-center">{cafe.name}</h2>
      </div>
      <h1>{cafe.description}</h1>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Menu</h1>
        {myDrinks.length === 0 ? (
          <p>
            You don&apos;t have any drinks yet. Add some below!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {myDrinks.map((drink) => (
              <Card key={drink.id}>
                <CardHeader>
                  <CardTitle>{drink.name}</CardTitle>
                  <CardDescription>{drink.description}</CardDescription>
                  <CardDescription>Price: {drink.price} / Sweetness: {drink.sweetness}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
        <CreateDrink cafeId={cafe.id} />
      </div>
    </div>
  )
}

export default Page