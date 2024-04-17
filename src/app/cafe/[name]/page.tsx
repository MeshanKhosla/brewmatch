import { redirect } from "next/navigation"
import { getCafeByName } from "~/queries"

const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = params
  const decodedName = decodeURIComponent(name)

  const cafe = await getCafeByName(decodedName)
  if (!cafe) {
    redirect("/discover")
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{cafe.name}</h1>
      <h1>{cafe.description}</h1>
    </div>
  )
}

export default Page