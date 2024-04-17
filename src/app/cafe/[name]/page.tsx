import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import { getCafeByName } from "~/queries"
import { authOptions } from "~/server/auth";

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

  return (
    <div>
      <div className="flex items-center justify-center bg-[#F7F0DD] text-black p-4 text-center py-12">
        <h2 className="text-4xl text-center">{cafe.name}</h2>
      </div>
      <h1>{cafe.description}</h1>
    </div>
  )
}

export default Page